/**
 * Wrapper discord api (message)
 * =====================
 *
 *
 * @license: MIT License
 *
 */
import logger from "@app/functions/utils/logger";

const getUsername = (ctx: any): string => {
	const username = ctx?.user?.username;

	return username || "";
};

const getUserDiscriminator = (ctx: any): string => {
	return ctx?.user?.discriminator;
};
const getUserID = (ctx: any): string => {
	const id = ctx?.user?.id;

	return `${id}` || "0";
};

const getUserAvatar = (ctx: any): string => {
	return ctx?.user?.displayAvatarURL({ format: "jpg" });
};

const send = async (ctx: any, text: string, image: any): Promise<any> => {
	if (text || image) {
		let message;

		try {
			message = await ctx.reply(image ? { files: [{ attachment: image }] } : text);
			return message;
		} catch (err: any) {
			logger.error(JSON.stringify(err), "message.ts:send()");
		}
	}
};

const isBot = (ctx) => {
	return ctx?.user?.bot;
};

export { getUsername, getUserID, getUserAvatar, getUserDiscriminator, send, isBot };
export default {
	getUsername,
	getUserDiscriminator,
	getUserAvatar,
	getUserID,
	send,
	isBot,
};
