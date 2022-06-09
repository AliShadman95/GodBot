/**
 * Grammy Telegram API Framework Hears
 * =====================
 *
 * Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { TextChannel } from "discord.js";
import bot from "@app/core/token";
import discord from "@routes/api/discord";
import type { DiscordSettingsRankInterface, DiscordVoiceChannelInterface } from "@app/types/databases.type";
import differenceInSeconds from "date-fns/differenceInSeconds";
import db from "@routes/api/database";
import logger from "@app/functions/utils/logger";
import isLevelUp from "@app/functions/common/isLevelUp";

// Use this const for testing
const minimumSecondsInVoiceChannel = 600;

const userJoin = async (id: string, username: string): Promise<void> => {
	await db.voiceChannel.add({ id, username, joinTime: Date.now() });
	logger.info(`User joined ${id}-${username}`, "voiceDetection.ts:userJoin()");
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
	logger.info(`User left ${member.id}-${member.username}`, "voiceDetection.ts:userLeft()");
	const userInChannel = await db.voiceChannel.get({ id: member.id });

	if (userInChannel.id !== "0") {
		// Se l'utente esiste ed è stato nel canale per almeno 600 secondi (10 minuti)
		if (differenceInSeconds(Date.now(), userInChannel.joinTime) > minimumSecondsInVoiceChannel) {
			const points = getPointsByTimeInChannel(userInChannel, minPointsVoiceChannel, maxPointsVoiceChannel);
			logger.info(
				`ASSEGNANDO ALL'UTENTE ${member.username} questi punti : ${points}`,
				"voiceDetection.ts:userLeft()",
			);

			let user = await db.rank.get({ id: member.id });

			if (user.id !== "0") {
				await db.rank.update(
					{ id: member.id },
					{
						...user,
						points: (parseInt(user.points) + points).toString(),
						secondsInVoiceChat: (user.secondsInVoiceChat += differenceInSeconds(
							Date.now(),
							userInChannel.joinTime,
						)),
					},
				);
			} else {
				await db.rank.add({
					...member,
					points: points.toString(),
					messageAwarded: 0,
					secondsInVoiceChat: (user.secondsInVoiceChat += differenceInSeconds(
						Date.now(),
						userInChannel.joinTime,
					)),
				});
				user = await db.rank.get({ id: member.id });
			}

			const levelUp = isLevelUp(xps, user.points, points);

			if (displayLevelUpMessage && levelUp !== -1) {
				logger.info(
					`NUOVO LIVELLO PER ${user.username}, aveva: ${user.points} e ha ricevuto: ${points}`,
					"voiceDetection.ts:voiceDetection()",
				);
				const channel = bot.channels.cache.get(levelUpChannelId) as TextChannel;
				channel.send(
					levelUpMessage
						.replace("{user}", user.username || "")
						.replace("{livello}", levelUp.toString() || ""),
				);
			}
		}
		// Removing the user
		await db.voiceChannel.remove({ id: member.id });
	}
};

const getPointsByTimeInChannel = (
	user: DiscordVoiceChannelInterface,
	minPointsVoiceChannel: string,
	maxPointsVoiceChannel: string,
): number => {
	const pointAwarded =
		Math.floor(Math.random() * (parseInt(maxPointsVoiceChannel) - (parseInt(minPointsVoiceChannel) + 1))) +
		parseInt(minPointsVoiceChannel);

	return Math.floor(differenceInSeconds(Date.now(), user.joinTime) / minimumSecondsInVoiceChannel) * pointAwarded;
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
		const username = newMember?.member?.user?.username || "";
		const settings = await db.settings.get({});

		const afkChannel = bot.channels.cache.get(settings?.rank?.afkChannelId);

		if (newUserChannel?.id === afkChannel?.id) {
			// Se l'utente è andato diretto negli AFK
			if (oldUserChannel === null) {
				logger.info(
					`USER ${newMember?.member?.user.username} JOINED AFK,NOT GETTING POINTS`,
					"voiceDetection.ts:voiceDetection()",
				);
				return;
			}
			// Se l'utente è passato da AFK a qualche altro canale
			logger.info(
				`USER ${newMember?.member?.user.username} JOINED AFK,HE COME FROM NORMAL CHANNEL, HE IS GETTING POINTS`,
				"voiceDetection.ts:voiceDetection()",
			);
			await userLeft(newMember?.member?.user, settings.rank);
		}

		if (discord.api.message.getBotID(bot) === userId || !userId) {
			logger.info(
				`BOT HAS JOINED VOICE CHANEL OR USERID IS NULL, RETURNING`,
				"voiceDetection.ts:voiceDetection()",
			);
			return;
		}

		if (oldUserChannel === null || (oldUserChannel?.id === afkChannel?.id && newUserChannel !== null)) {
			await userJoin(userId, username);
		}

		if (oldUserChannel !== null && newUserChannel === null) {
			await userLeft(newMember.member.user, settings.rank);
		}
	});
};

export { voiceDetection };
export default voiceDetection;
