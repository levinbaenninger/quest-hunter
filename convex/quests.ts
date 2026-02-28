import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireUser } from "./_utils/user";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export const get = query({
  args: {
    questId: v.id("quests"),
  },
  handler: async (ctx, { questId }) => {
    await requireUser(ctx);

    const quest = await ctx.db.get(questId);
    if (!quest) throw new ConvexError("Quest not found");

    return quest;
  },
});

export const listRecommended = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireUser(ctx);

    const [allQuests, userQuests] = await Promise.all([
      ctx.db.query("quests").collect(),
      ctx.db
        .query("userQuests")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .collect(),
    ]);

    const completedQuestIds = new Set(
      userQuests
        .filter((uq) => uq.completedAt !== undefined)
        .map((uq) => uq.questId),
    );

    return allQuests.filter((quest) => !completedQuestIds.has(quest._id));
  },
});

export const listNew = query({
  args: {},
  handler: async (ctx) => {
    const user = await requireUser(ctx);

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
        .filter((uq) => uq.completedAt !== undefined)
        .map((uq) => uq.questId),
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
    const user = await requireUser(ctx);

    const completedUserQuests = await ctx.db
      .query("userQuests")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .filter((q) => q.neq(q.field("completedAt"), undefined))
      .collect();

    const quests = await Promise.all(
      completedUserQuests.map((uq) => ctx.db.get(uq.questId)),
    );

    return quests.filter((quest) => quest !== null);
  },
});

export const getStatus = query({
  args: {
    questId: v.id("quests"),
  },
  handler: async (ctx, { questId }) => {
    const user = await requireUser(ctx);

    return await ctx.db
      .query("userQuests")
      .withIndex("by_user_and_quest", (q) =>
        q.eq("userId", user._id).eq("questId", questId),
      )
      .unique();
  },
});

export const start = mutation({
  args: {
    questId: v.id("quests"),
  },
  handler: async (ctx, { questId }) => {
    const user = await requireUser(ctx);

    const quest = await ctx.db.get(questId);
    if (!quest) throw new ConvexError("Quest not found");

    const existing = await ctx.db
      .query("userQuests")
      .withIndex("by_user_and_quest", (q) =>
        q.eq("userId", user._id).eq("questId", questId),
      )
      .unique();

    if (existing) {
      if (existing.completedAt)
        throw new ConvexError("Quest already completed");
      if (!existing.cancelledAt)
        throw new ConvexError("Quest already in progress");

      // Clear previous location progress so the restart begins from waypoint 1
      const previousLocations = await ctx.db
        .query("userLocations")
        .withIndex("by_user_and_quest", (q) =>
          q.eq("userId", user._id).eq("questId", questId),
        )
        .collect();
      await Promise.all(previousLocations.map((ul) => ctx.db.delete(ul._id)));

      return await ctx.db.patch(existing._id, {
        cancelledAt: undefined,
        startedAt: Date.now(),
      });
    }

    return await ctx.db.insert("userQuests", {
      userId: user._id,
      questId,
      startedAt: Date.now(),
    });
  },
});

export const complete = mutation({
  args: {
    questId: v.id("quests"),
  },
  handler: async (ctx, { questId }) => {
    const user = await requireUser(ctx);

    const userQuest = await ctx.db
      .query("userQuests")
      .withIndex("by_user_and_quest", (q) =>
        q.eq("userId", user._id).eq("questId", questId),
      )
      .unique();

    if (!userQuest) throw new ConvexError("Quest not started");
    if (userQuest.cancelledAt)
      throw new ConvexError("Quest has been cancelled");
    if (userQuest.completedAt) throw new ConvexError("Quest already completed");

    await ctx.db.patch(userQuest._id, { completedAt: Date.now() });
  },
});

export const cancel = mutation({
  args: {
    questId: v.id("quests"),
  },
  handler: async (ctx, { questId }) => {
    const user = await requireUser(ctx);

    const userQuest = await ctx.db
      .query("userQuests")
      .withIndex("by_user_and_quest", (q) =>
        q.eq("userId", user._id).eq("questId", questId),
      )
      .unique();

    if (!userQuest) throw new ConvexError("Quest not started");
    if (userQuest.completedAt) throw new ConvexError("Quest already completed");
    if (userQuest.cancelledAt) throw new ConvexError("Quest already cancelled");

    await ctx.db.patch(userQuest._id, { cancelledAt: Date.now() });
  },
});
