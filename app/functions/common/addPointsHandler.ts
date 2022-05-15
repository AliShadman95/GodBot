import db from "@routes/api/database";
import discord from "@routes/api/discord";
import logger from "@app/functions/utils/logger";

// Array that detect if user can get point
let cooldowns: string[] = [];

const disablePoints = async (userId: string, cooldown: number) => {
	cooldowns.push(userId);
	logger.info(`disablin now the ability to get point for user ${userId} `, "addPointHandler.ts:disablePoints()");

	setTimeout(() => {
		logger.info(`setting now the ability to get point for user  ${userId} `, "addPointHandler.ts:disablePoints()");

		cooldowns = cooldowns.filter((f) => f !== userId);
	}, cooldown * 1000);
};

const addPointsHandler = async (ctx) => {
	const userId = discord.api.message.getUserID(ctx);

	if (cooldowns.includes(userId)) {
		return;
	}

	const user = await db.rank.get({ id: userId });
	const settings = await db.settings.get({});
	const pointAwarded =
		Math.floor(Math.random() * (settings?.rank.maxPointsMessage - settings?.rank.minPointsMessage + 1)) +
		settings?.rank.minPointsMessage;

	logger.info(`Getting points for user ${userId}, points: ${pointAwarded} `, "addPointHandler.ts:disablePoints()");

	if (!user) {
		await db.rank.add({ ...ctx.author, points: pointAwarded });
		return;
	}

	await db.rank.update({ id: userId }, { ...user, points: (parseInt(user.points) + pointAwarded).toString() });

	disablePoints(userId, settings?.rank.messagePointCooldown);
};

export default addPointsHandler;
export { addPointsHandler };
