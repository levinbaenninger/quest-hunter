import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireUser } from "./_utils/user";

export const listByQuest = query({
  args: {
    questId: v.id("quests"),
  },
  handler: async (ctx, { questId }) => {
    await requireUser(ctx);

    const quest = await ctx.db.get(questId);
    if (!quest) throw new ConvexError("Quest not found");

    return await ctx.db
      .query("locations")
      .withIndex("by_quest_order", (q) => q.eq("questId", questId))
      .collect();
  },
});

export const listCompleted = query({
  args: {
    questId: v.id("quests"),
  },
  handler: async (ctx, { questId }) => {
    const user = await requireUser(ctx);

    return await ctx.db
      .query("userLocations")
      .withIndex("by_user_and_quest", (q) =>
        q.eq("userId", user._id).eq("questId", questId),
      )
      .collect();
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);

    return await ctx.storage.generateUploadUrl();
  },
});

export const complete = mutation({
  args: {
    questId: v.id("quests"),
    locationId: v.id("locations"),
    photoStorageId: v.id("_storage"),
  },
  handler: async (ctx, { questId, locationId, photoStorageId }) => {
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

    const location = await ctx.db.get(locationId);
    if (!location) throw new ConvexError("Location not found");
    if (location.questId !== questId)
      throw new ConvexError("Location does not belong to this quest");

    const existing = await ctx.db
      .query("userLocations")
      .withIndex("by_user_and_location", (q) =>
        q.eq("userId", user._id).eq("locationId", locationId),
      )
      .unique();
    if (existing) throw new ConvexError("Location already completed");

    return await ctx.db.insert("userLocations", {
      userId: user._id,
      questId,
      locationId,
      photoStorageId,
      completedAt: Date.now(),
    });
  },
});
