import discord from "@routes/api/discord";
import db from "@routes/api/database";
import { generateRankCard } from "@app/functions/common/generateRankCard";

/**
 * command: !removexp
 * =====================
 * Remove xp from user.
 *
 * @param message
 * @param ctx
 */
const removeXp = async (ctx): Promise<void> => {
	/* const users = await db.rank.getAll();

	if (!users.find((u) => u.id === discord.api.message.getUserID(ctx))) {
		await db.rank.add({ ...ctx.author, points: "0", messageAwarded: 0, secondsInVoiceChat: 0 });
	}

	const user = await db.rank.get({ id: discord.api.message.getUserID(ctx) });
	const settings = await db.settings.get({});
	const allUsers = await db.rank.getAll();

	const card = await generateRankCard({
		...settings?.rank,
		username: discord.api.message.getUsername(ctx),
		discriminator: discord.api.message.getUserDiscriminator(ctx),
		avatar: discord.api.message.getUserAvatar(ctx),
		points: user?.points || "0", // TODO Change user points to 0
		rank:
			allUsers
				.sort((a, b) => parseInt(b.points) - parseInt(a.points))
				.findIndex((u) => u.id === discord.api.message.getUserID(ctx)) + 1,
	});

	discord.api.message.send(ctx, "", card); */
};

export { removeXp };
export default removeXp;
