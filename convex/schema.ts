import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  quests: defineTable({
    title: v.string(),
    description: v.string(),
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
});

export default schema;
