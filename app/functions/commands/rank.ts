import bot from "@app/core/token";
import discord from "@routes/api/discord";
import logger from "@app/functions/utils/logger";
import translate from "@translations/translate";
import db from "@routes/api/database";
import { generateRankCard } from "@app/functions/common/generateRankCard";
import { getUserAvatar } from "../api/discord/message";

/**
 * command: !rank
 * =====================
 * Current rank of user or of specified user.
 *
 * @param message
 * @param ctx
 */
const rank = async (ctx): Promise<void> => {
	const users = await db.rank.getAll();

	if (!users.find((u) => u.id === discord.api.message.getUserID(ctx))) {
		await db.rank.add({ ...ctx.author, points: 0 });
	}

	const user = await db.rank.get({ id: discord.api.message.getUserID(ctx) });

	const settings = { isGradient: false, gradientColor1: "red", gradientColor2: "blue" };

	const card = await generateRankCard({
		...settings,
		username: discord.api.message.getUsername(ctx),
		discriminator: discord.api.message.getUserDiscriminator(ctx),
		avatar: discord.api.message.getUserAvatar(ctx),
		points: user?.points || "0",
	});

	discord.api.message.send(ctx, "", card);
};

export { rank };
export default rank;
