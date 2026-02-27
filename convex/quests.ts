import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { requireAuth } from "./_utils/auth";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const get = query({
  args: {
    questId: v.id("quests"),
  },
  handler: async ({ db }, { questId }) => {
    const quest = await db.get(questId);
    if (!quest) throw new ConvexError("Quest not found");

    return quest;
  },
});

export const listRecommended = query({
  args: {},
  handler: async (ctx) => {
    const identity = await requireAuth(ctx);

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) throw new ConvexError("User not found");

    const [allQuests, userQuests] = await Promise.all([
      ctx.db.query("quests").collect(),
      ctx.db
        .query("userQuests")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .collect(),
    ]);

    const completedQuestIds = new Set(
      userQuests
        .filter((userQuest) => userQuest.completedAt !== undefined)
        .map((userQuest) => userQuest.questId),
    );

    return allQuests.filter((quest) => !completedQuestIds.has(quest._id));
  },
});

export const listNew = query({
  args: {},
  handler: async (ctx) => {
    const identity = await requireAuth(ctx);

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) throw new ConvexError("User not found");

    const cutoff = Date.now() - SEVEN_DAYS_MS;

    const [allQuests, userQuests] = await Promise.all([
      ctx.db.query("quests").collect(),
      ctx.db
        .query("userQuests")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .collect(),
    ]);

    const completedQuestIds = new Set(
      userQuests
        .filter((userQuest) => userQuest.completedAt !== undefined)
        .map((userQuest) => userQuest.questId),
    );

    return allQuests.filter(
      (quest) =>
        quest._creationTime >= cutoff && !completedQuestIds.has(quest._id),
    );
  },
});

export const listFinished = query({
  args: {},
  handler: async (ctx) => {
    const identity = await requireAuth(ctx);

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();
    if (!user) throw new ConvexError("User not found");

    const completedUserQuests = await ctx.db
      .query("userQuests")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.neq(q.field("completedAt"), undefined))
      .collect();

    const quests = await Promise.all(
      completedUserQuests.map((userQuest) => ctx.db.get(userQuest.questId)),
    );

    return quests.filter((quest) => quest !== null);
  },
});
