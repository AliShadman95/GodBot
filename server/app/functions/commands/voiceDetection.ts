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
const minimumSecondsInVoiceChannel = 3;

const userJoin = async (id: string, username: string): Promise<void> => {
	logger.info(`User joined ${id}-${username}`, "voiceDetection.ts:userJoin()");
	if (id === "0") {
		return;
	}

	await db.voiceChannel.add({ id, username, joinTime: Date.now() });
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

			let isNewUser = false;

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
				isNewUser = true;
			}

			const levelUp = isLevelUp(xps, user.points, points, isNewUser);

			if (displayLevelUpMessage && levelUp !== -1) {
				logger.info(
					`NUOVO LIVELLO PER ${user.username}, aveva: ${user.points} e ha ricevuto: ${points}`,
					"voiceDetection.ts:voiceDetection()",
				);
				const channel = bot.channels.cache.get(levelUpChannelId) as TextChannel;
				channel.send(
					levelUpMessage
						.replace("{user}", `<@${user.id}>` || "")
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

		// IT WILL ASSIGN POINTS WHEN USER LEFT THE VOICE CHANNEL

		const isJoinNormal = newUserChannel && !oldUserChannel && newUserChannel.id !== afkChannel?.id;
		const isLeaveNormal = oldUserChannel && !newUserChannel && oldUserChannel.id !== afkChannel?.id;
		const isJoinAfkDirect = newUserChannel && !oldUserChannel && afkChannel?.id === newUserChannel.id;
		const isJoinAfkFromChannel = newUserChannel && oldUserChannel && afkChannel?.id === newUserChannel.id;
		const isJoinChannelFromAfk = newUserChannel && oldUserChannel && afkChannel?.id === oldUserChannel.id;
		const isLeftAfk = oldUserChannel && !newUserChannel && afkChannel?.id === oldUserChannel.id;
		const isChangeChannel =
			oldUserChannel &&
			newUserChannel &&
			oldUserChannel.id !== newUserChannel.id &&
			afkChannel?.id !== newUserChannel.id &&
			afkChannel?.id !== oldUserChannel.id;

		const joinVoiceChannel = async (): Promise<void> => {
			switch (newUserChannel?.members?.filter((m) => !m.user.bot).size) {
				case 1:
					break;
				case 2:
					newUserChannel?.members.forEach(async (m) => {
						if (!m.user.bot) {
							await userJoin(m.user.id, m.user.username);
						}
					});
					break;
				default:
					await userJoin(userId || "0", username);
					break;
			}
		};

		const leaveVoiceChannel = async (): Promise<void> => {
			switch (oldUserChannel?.members?.filter((m) => !m.user.bot).size) {
				case 0:
					break;
				case 1:
					await userLeft(newMember.member?.user, settings.rank);
					await userLeft(oldUserChannel.members.first()?.user, settings.rank);
					break;
				default:
					await userLeft(newMember.member?.user, settings.rank);
					break;
			}
		};

		if (isJoinAfkDirect || isLeftAfk || discord.api.message.getBotID(bot) === userId) {
			return;
		}

		if (isJoinNormal || isJoinChannelFromAfk) {
			await joinVoiceChannel();
			return;
		}

		if (isLeaveNormal || isJoinAfkFromChannel) {
			await leaveVoiceChannel();
			return;
		}

		if (isChangeChannel) {
			await leaveVoiceChannel();
			await joinVoiceChannel();
			return;
		}
	});
};

export { voiceDetection };
export default voiceDetection;
