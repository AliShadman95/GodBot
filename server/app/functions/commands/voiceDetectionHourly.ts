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
import translate from "@translations/translate";
import discord from "@routes/api/discord";
import differenceInSeconds from "date-fns/differenceInSeconds";
import db from "@routes/api/database";
import telegram from "@routes/api/discord";
import logger from "@app/functions/utils/logger";

interface UserTimeInChannelData {
	id: string;
	joinTimes: number[];
	leftTimes: number[];
}

let usersTimeInChannelData: UserTimeInChannelData[] = [];

const userJoin = (userId: string): void => {
	console.log("User joined");
	if (usersTimeInChannelData.some((user) => user.id === userId)) {
		usersTimeInChannelData = usersTimeInChannelData.map((user) =>
			user.id === userId ? { ...user, joinTimes: [...user.joinTimes, Date.now()] } : user,
		);
		console.log("User has joined after he left", usersTimeInChannelData);
	} else {
		usersTimeInChannelData.push({ id: userId, joinTimes: [Date.now()], leftTimes: [] });
		console.log(usersTimeInChannelData);
	}
};

const userLeft = (userId: string): void => {
	if (usersTimeInChannelData.some((user) => user.leftTimes.length > 0)) {
		usersTimeInChannelData = usersTimeInChannelData.map((user) =>
			user.id === userId ? { ...user, leftTimes: [...user.leftTimes, Date.now()] } : user,
		);
		console.log("User has left after he joined", usersTimeInChannelData);
	} else {
		usersTimeInChannelData = usersTimeInChannelData.map((user) =>
			user.id === userId ? { ...user, leftTimes: [Date.now()] } : user,
		);
		console.log("User left");
	}

	console.log(usersTimeInChannelData);

	getPointsByTimeInChannel();
};

const getPointsByTimeInChannel = (): object => {
	return usersTimeInChannelData.map((user) => {
		const totalPoints = user.joinTimes.map((j, index) => {
			return Math.floor(differenceInSeconds(user.leftTimes[index] || Date.now(), j) / 10) > 0
				? Math.floor(differenceInSeconds(user.leftTimes[index] || Date.now(), j) / 10) * 10
				: 0;
		});

		return { id: user.id, points: totalPoints.reduce((a, b) => a + b, 0) };
	});
};

const hourBatch = async (): Promise<void> => {
	setInterval(function () {
		console.log("calling the batch function");
		if (usersTimeInChannelData.length > 0) {
			const points = getPointsByTimeInChannel();
			console.log("pointAwarded", points);
			usersTimeInChannelData = [];
		}
	}, 60 * 1000);
};

/**
 * Voice Detection: Hear user join voice chat
 * =====================
 * Listen any user joins voice chat
 *
 */
const voiceDetection = async (): Promise<void> => {
	await hourBatch();
	bot.on("voiceStateUpdate", async (oldMember, newMember) => {
		const newUserChannel = newMember.channel;
		const oldUserChannel = oldMember.channel;
		const userId = newMember?.member?.user?.id;

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
			userLeft(userId);
		}
	});
};

export { voiceDetection };
export default voiceDetection;
