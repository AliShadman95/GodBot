import { TextChannel } from "discord.js";
import bot from "@app/core/token";
import db from "@routes/api/database";
import discord from "@routes/api/discord";
import logger from "@app/functions/utils/logger";
import isLevelUp from "@app/functions/common/isLevelUp";

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
		Math.floor(
			Math.random() *
				(parseInt(settings?.rank.maxPointsMessage) - (parseInt(settings?.rank.minPointsMessage) + 1)),
		) + parseInt(settings?.rank.minPointsMessage);

	logger.info(`Getting points for user ${userId}, points: ${pointAwarded} `, "addPointHandler.ts:disablePoints()");

	if (user.id === "0") {
		await db.rank.add({ ...ctx.author, points: pointAwarded, messageAwarded: 1, secondsInVoiceChat: 0 });
		return;
	}

	await db.rank.update(
		{ id: userId },
		{
			...user,
			points: (parseInt(user.points) + pointAwarded).toString(),
			messageAwarded: (user.messageAwarded += 1),
		},
	);

	disablePoints(userId, parseInt(settings?.rank?.messagePointCooldown));

	const levelUp = isLevelUp(settings?.rank?.xps, user.points, pointAwarded);
	if (settings?.rank?.displayLevelUpMessage && levelUp !== -1) {
		const channel = bot.channels.cache.get(settings?.rank?.levelUpChannelId) as TextChannel;
		channel.send(
			settings?.rank?.levelUpMessage
				.replace("{user}", user.username || "")
				.replace("{livello}", levelUp.toString() || ""),
		);
	}
};

export default addPointsHandler;
export { addPointsHandler };
