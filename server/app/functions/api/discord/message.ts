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
	const username = ctx?.author?.username;

	return username || "";
};

const getBotName = (ctx: any): string => {
	const username = ctx?.username;

	return username || "";
};

const getUserDiscriminator = (ctx: any): string => {
	return ctx?.author?.discriminator;
};
const getUserID = (ctx: any): string => {
	const id = ctx?.author?.id;

	return `${id}` || "0";
};

const getBotID = (ctx: any): string => {
	const id = ctx?.id;

	return `${id}` || "0";
};

const getUserAvatar = (ctx: any): string => {
	return ctx?.author?.displayAvatarURL({ format: "jpg" });
};

const send = async (ctx: any, text: string, image: any): Promise<any> => {
	if (text || image) {
		let message;

		try {
			message = await ctx.channel.send(image ? { files: [{ attachment: image }] } : text);
			return message;
		} catch (err: any) {
			logger.error(JSON.stringify(err), "message.ts:send()");
		}
	}
};

/* const getUserFirstName = (ctx: any): string => {
	const first_name = ctx?.update?.message?.from?.first_name;

	return first_name?.trim() || "";
};

const getFullUser = (ctx: any): any => {
	const from = ctx?.update?.message?.from || {};

	from.username = getUsername(ctx);
	from.question = "";
	from.description = "";
	from.score = 0;

	return from;
};

const getChatID = (ctx: any): number => {
	return (
		ctx?.update.message?.chat?.id || ctx?.message?.chat?.id || ctx?.update?.callback_query?.message?.chat?.id || 0
	);
};

const getActionType = (ctx: any): string => {
	return ctx?.update?.callback_query?.data || "";
};

const getPhotoFileID = (ctx: any, position = 0): string => {
	return ctx?.update?.message?.photo[position]?.file_id || "";
};

const getPhotoCaption = (ctx: any): string => {
	return ctx?.update?.message?.caption || "";
};

const getText = (ctx: any): string => {
	return ctx?.update?.message?.text || ctx?.message?.text || "";
};



const pin = async (
	ctx: any,
	group_id: number,
	message_id: number,
	options: any = { disable_notification: true },
): Promise<void> => {
	logger.debug(`group_id: ${group_id}`, "message.ts:pin()");
	logger.debug(`message_id: ${message_id}`, "message.ts:pin()");

	if (group_id && message_id) {
		try {
			await ctx.api.pinChatMessage(group_id, message_id, options);
		} catch (err: any) {
			logger.error(JSON.stringify(err), "message.ts:pin()");
		}
	}
}; */

const isCommand = (command) => {
	return command.startsWith("!") || command.startsWith("/");
};

const isBot = (ctx) => {
	return ctx?.author?.bot;
};

export {
	/* getFullUser, */
	getUsername,
	/* 	getChatID,
	getText, */
	getUserID,
	getUserAvatar,
	getUserDiscriminator,
	send,
	isBot,
	/* getUserFirstName,
	send,
	
	pin,
	getPhotoFileID,
	getPhotoCaption,
	getActionType, */
	isCommand,
	getBotName,
	getBotID,
};
export default {
	/* 	getFullUser, */
	getUsername,
	getUserDiscriminator,
	getUserAvatar,
	/* 	getChatID,
	getText, */
	getUserID,
	send,
	isBot,
	/* 	getUserFirstName,
	send,
	pin,

	getPhotoFileID,
	getPhotoCaption,
	getActionType, */
	isCommand,
	getBotName,
	getBotID,
};
