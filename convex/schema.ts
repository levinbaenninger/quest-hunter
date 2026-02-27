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
});

export default schema;
