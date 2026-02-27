import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async ({ db }) => {
    return await db.query("quests").collect();
  },
});

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
