import { ConvexError } from "convex/values";
import type { MutationCtx, QueryCtx } from "../_generated/server";
import { requireAuth } from "./auth";

export const requireUser = async (ctx: QueryCtx | MutationCtx) => {
  const identity = await requireAuth(ctx);

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .unique();

  if (!user) throw new ConvexError("User not found");

  return user;
};
