/**
 * Grammy Telegram API Framework Hears
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/token";
import discord from "@routes/api/discord";
import type { DiscordSettingsRankInterface } from "@app/types/databases.type";
import differenceInSeconds from "date-fns/differenceInSeconds";
import db from "@routes/api/database";
import logger from "@app/functions/utils/logger";

interface UserTimeInChannelData {
	id: string;
	joinTime: number;
}

let usersTimeInChannelData: UserTimeInChannelData[] = [];

const userJoin = (userId: string): void => {
	usersTimeInChannelData.push({ id: userId, joinTime: Date.now() });
	logger.info(`User joined ${userId}`, "voiceDetection.ts:userJoin()");
};

const userLeft = async (
	userId: string,
	{ minPointsVoiceChannel, maxPointsVoiceChannel }: DiscordSettingsRankInterface,
): Promise<void> => {
	logger.info(`User left ${userId}`, "voiceDetection.ts:userLeft()");
	const userInChannel = usersTimeInChannelData.find((u) => u.id === userId);

	// Se l'utente esiste ed è stato nel canale per almeno 600 secondi (10 minuti)
	if (userInChannel && differenceInSeconds(Date.now(), userInChannel.joinTime) > 600) {
		const points = getPointsByTimeInChannel(userInChannel, minPointsVoiceChannel, maxPointsVoiceChannel);
		logger.info(`ASSEGNANDO ALL'UTENTE ${userId} questi punti : ${points}`, "voiceDetection.ts:userLeft()");

		const user = await db.rank.get({ id: userId });

		if (user) {
			await db.rank.update({ id: userId }, { ...user, points: (parseInt(user.points) + points).toString() });
		}

		usersTimeInChannelData = usersTimeInChannelData.filter((u) => u.id !== userId);
	}
};

const getPointsByTimeInChannel = (
	user: UserTimeInChannelData,
	minPointsVoiceChannel: number,
	maxPointsVoiceChannel: number,
): number => {
	const pointAwarded =
		Math.floor(Math.random() * (maxPointsVoiceChannel - minPointsVoiceChannel + 1)) + minPointsVoiceChannel;

	return Math.floor(differenceInSeconds(Date.now(), user.joinTime) / 600) * pointAwarded;
};

/**
 * Voice Detection: Hear user join voice chat
 * =====================
 * Listen any user joins voice chat
 *
 */
const voiceDetection = async (): Promise<void> => {
	bot.on("voiceStateUpdate", async (oldMember, newMember) => {
		const newUserChannel = newMember.channel;
		const oldUserChannel = oldMember.channel;
		const userId = newMember?.member?.user?.id;
		const settings = await db.settings.get({});

		if (discord.api.message.getBotID(bot) === userId || !userId) {
			logger.info(
				`BOT HAS JOINED VOICE CHANEL OR USERID IS NULL, RETURNING`,
				"voiceDetection.ts:voiceDetection()",
			);
			return;
		}

		if (oldUserChannel === null && newUserChannel !== null) {
			userJoin(userId);
		}

		if (oldUserChannel !== null && newUserChannel === null) {
			await userLeft(userId, settings.rank);
		}
	});
};

export { voiceDetection };
export default voiceDetection;
