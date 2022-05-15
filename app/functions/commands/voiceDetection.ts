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
/* import moment from "moment";
 */ import db from "@routes/api/database";
import telegram from "@routes/api/discord";
import logger from "@app/functions/utils/logger";

const pointsToAwardToUsers = [];

const startTimer = (userId: string): void => {
	console.log("start timer");
	/* if(userAwards.includes(userId)) {
		return;
	} */
};

const stopTimer = (userId: string, oldMember): void => {
	console.log("stop timer");

	const points = getPointsByTimeInChannel(oldMember.member.joinedTimestamp);
};

const getPointsByTimeInChannel = (timestamp: string): string => {
	/* 	const d = moment(timestamp);
	console.log(d); */
	return "";
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

		if (discord.api.message.getBotID(bot) === userId || !userId) {
			logger.info(
				`BOT HAS JOINED VOICE CHANEL OR USERID IS NULL, RETURNING`,
				"voiceDetection.ts:voiceDetection()",
			);
			return;
		}

		console.log(oldUserChannel);

		if (oldUserChannel === null && newUserChannel !== null) {
			startTimer(userId);
		}

		if (oldUserChannel !== null && newUserChannel === null) {
			stopTimer(userId, oldMember);
		}
	});
};

export { voiceDetection };
export default voiceDetection;
