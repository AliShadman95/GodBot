/**
 * Grammy Telegram API Framework Hears
 * =====================
 *
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { TextChannel } from "discord.js";
import bot from "@app/core/token";
import discord from "@routes/api/discord";
import type { DiscordSettingsRankInterface } from "@app/types/databases.type";
import differenceInSeconds from "date-fns/differenceInSeconds";
import db from "@routes/api/database";
import logger from "@app/functions/utils/logger";
import isLevelUp from "@app/functions/common/isLevelUp";

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
	member: any,
	{
		minPointsVoiceChannel,
		maxPointsVoiceChannel,
		xps,
		displayLevelUpMessage,
		levelUpChannelId,
		levelUpMessage,
	}: DiscordSettingsRankInterface,
): Promise<void> => {
	logger.info(`User left ${member.id}`, "voiceDetection.ts:userLeft()");
	const userInChannel = usersTimeInChannelData.find((u) => u.id === member.id);

	// Se l'utente esiste ed è stato nel canale per almeno 600 secondi (10 minuti)
	if (userInChannel && differenceInSeconds(Date.now(), userInChannel.joinTime) > 600) {
		const points = getPointsByTimeInChannel(userInChannel, minPointsVoiceChannel, maxPointsVoiceChannel);
		logger.info(`ASSEGNANDO ALL'UTENTE ${member.id} questi punti : ${points}`, "voiceDetection.ts:userLeft()");

		let user = await db.rank.get({ id: member.id });

		if (user.id !== "0") {
			await db.rank.update({ id: member.id }, { ...user, points: (parseInt(user.points) + points).toString() });
		} else {
			await db.rank.add({ ...member, points: points.toString() });
			user = await db.rank.get({ id: member.id });
		}

		usersTimeInChannelData = usersTimeInChannelData.filter((u) => u.id !== member.id);

		const levelUp = isLevelUp(xps, user.points, points);

		if (displayLevelUpMessage && levelUp !== -1) {
			const channel = bot.channels.cache.get(levelUpChannelId) as TextChannel;
			channel.send(
				levelUpMessage.replace("{user}", user.username || "").replace("{livello}", levelUp.toString() || ""),
			);
		}
	}
};

const getPointsByTimeInChannel = (
	user: UserTimeInChannelData,
	minPointsVoiceChannel: string,
	maxPointsVoiceChannel: string,
): number => {
	const pointAwarded =
		Math.floor(Math.random() * (parseInt(maxPointsVoiceChannel) - (parseInt(minPointsVoiceChannel) + 1))) +
		parseInt(minPointsVoiceChannel);

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

		const afkChannel = bot.channels.cache.get(settings?.rank?.afkChannelId);

		// TODO unificare i due if qui sotto una volta capito se è stabile
		if (newUserChannel?.id === afkChannel?.id) {
			logger.info(`USER JOINED AFK, NO POINTS CALCULATED`, "voiceDetection.ts:voiceDetection()");
			return;
		}

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
			await userLeft(newMember.member.user, settings.rank);
		}
	});
};

export { voiceDetection };
export default voiceDetection;
