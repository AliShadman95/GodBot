import discord from "@routes/api/discord";
import db from "@routes/api/database";
import { generateRankCard } from "@app/functions/common/generateRankCard";

/**
 * command: !rank
 * =====================
 * Current rank of user or of specified user.
 *
 * @param ctx
 */
const rank = async (ctx): Promise<void> => {
	const users = await db.rank.getAll();

	if (!users.find((u) => u.id === discord.api.interactions.getUserID(ctx))) {
		await db.rank.add({ ...ctx.author, points: "0", messageAwarded: 0, secondsInVoiceChat: 0 });
	}

	const user = await db.rank.get({ id: discord.api.interactions.getUserID(ctx) });
	const settings = await db.settings.get({});
	const allUsers = await db.rank.getAll();

	const card = await generateRankCard({
		...settings?.rank,
		username: discord.api.interactions.getUsername(ctx),
		discriminator: discord.api.interactions.getUserDiscriminator(ctx),
		avatar: discord.api.interactions.getUserAvatar(ctx),
		points: user?.points || "0", // TODO Change user points to 0
		rank:
			allUsers
				.sort((a, b) => parseInt(b.points) - parseInt(a.points))
				.findIndex((u) => u.id === discord.api.interactions.getUserID(ctx)) + 1,
	});

	discord.api.interactions.send(ctx, "", card);
};

export { rank };
export default rank;
