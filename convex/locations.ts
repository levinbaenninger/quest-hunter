import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    locationId: v.id("locations"),
  },
  handler: async ({ db }, { locationId }) => {
    const location = await db.get(locationId);

    if (!location) throw new ConvexError("Location not found");

    return location;
  },
});
