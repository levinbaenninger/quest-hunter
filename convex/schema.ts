import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  quests: defineTable({
    name: v.string(),
    description: v.string(),
    estimatedTime: v.number(),
    difficulty: v.union(
      v.literal("easy"),
      v.literal("medium"),
      v.literal("hard"),
    ),
    xp: v.number(),
    imageUrl: v.optional(v.string()),
  }),
  locations: defineTable({
    name: v.string(),
    description: v.string(),
    coordinates: v.object({
      latitude: v.number(),
      longitude: v.number(),
    }),
  }),
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkId"]),
  userQuests: defineTable({
    userId: v.id("users"),
    questId: v.id("quests"),
    startedAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_quest", ["questId"])
    .index("by_user_and_quest", ["userId", "questId"]),
});

export default schema;
