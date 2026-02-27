import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const startQuest = mutation({
  args: {
    questId: v.id("quests"),
  },
  handler: async (ctx, { questId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) throw new ConvexError("User not found");

    const quest = await ctx.db.get(questId);
    if (!quest) throw new ConvexError("Quest not found");

    const existing = await ctx.db
      .query("userQuests")
      .withIndex("by_user_and_quest", (q) =>
        q.eq("userId", user._id).eq("questId", questId),
      )
      .unique();

    if (existing) throw new ConvexError("Quest already started");

    return await ctx.db.insert("userQuests", {
      userId: user._id,
      questId,
      startedAt: Date.now(),
    });
  },
});

export const completeQuest = mutation({
  args: {
    questId: v.id("quests"),
  },
  handler: async (ctx, { questId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) throw new ConvexError("User not found");

    const userQuest = await ctx.db
      .query("userQuests")
      .withIndex("by_user_and_quest", (q) =>
        q.eq("userId", user._id).eq("questId", questId),
      )
      .unique();

    if (!userQuest) throw new ConvexError("Quest not started");
    if (userQuest.completedAt) throw new ConvexError("Quest already completed");

    await ctx.db.patch(userQuest._id, { completedAt: Date.now() });
  },
});

export const getQuestStatus = query({
  args: {
    questId: v.id("quests"),
  },
  handler: async (ctx, { questId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) return null;

    return await ctx.db
      .query("userQuests")
      .withIndex("by_user_and_quest", (q) =>
        q.eq("userId", user._id).eq("questId", questId),
      )
      .unique();
  },
});

export const listUserQuests = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) return [];

    return await ctx.db
      .query("userQuests")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
  },
});
