import { query } from "./_generated/server";
import { requireUser } from "./_utils/user";

export const list = query({
  args: {},
  handler: async (ctx) => {
    await requireUser(ctx);

    const [users, allUserQuests, allQuests] = await Promise.all([
      ctx.db.query("users").collect(),
      ctx.db.query("userQuests").collect(),
      ctx.db.query("quests").collect(),
    ]);

    const questXpMap = new Map(allQuests.map((q) => [q._id, q.xp]));

    const xpByUser = new Map<string, number>();
    for (const userQuest of allUserQuests) {
      if (!userQuest.completedAt) continue;
      const xp = questXpMap.get(userQuest.questId) ?? 0;
      xpByUser.set(
        userQuest.userId,
        (xpByUser.get(userQuest.userId) ?? 0) + xp,
      );
    }

    return users
      .map((user) => ({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        xp: xpByUser.get(user._id) ?? 0,
      }))
      .sort((a, b) => b.xp - a.xp);
  },
});
