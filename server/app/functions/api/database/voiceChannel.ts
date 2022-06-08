/**
 * Users database
 * =====================
 *
 *
 *
 * @license: MIT License
 *
 */
import { Schema, model } from "mongoose";
import type { DiscordVoiceChannelInterface } from "@app/types/databases.type";
import { logger } from "@app/functions/utils/logger";

const schema = new Schema<DiscordVoiceChannelInterface>({
	id: { type: String, default: "0" },
	username: { type: String, default: "" },
	joinTime: { type: Number, default: 0 },
});

const query = model<DiscordVoiceChannelInterface>("VoiceChannel", schema, "voicechannel");

/*
 *
 * Voice Channel CRUD
 * =====================
 * Add voice channel member to DB
 *
 * @param {DiscordVoiceChannelInterface} user - user to add
 * */

const add = async (user: DiscordVoiceChannelInterface): Promise<void> => {
	try {
		const doc = new query(user);
		await doc.save();
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "voiceChannel.ts:add()");
	}
};

/*
 *
 * Voice Channel CRUD
 * =====================
 * Remove user from voice channel DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 *
 */

const remove = async (search: Record<string, number | string | boolean>): Promise<void> => {
	try {
		await query.findOneAndDelete(search, function (error: string) {
			if (error) {
				logger.error(error || "");
			}
		});
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "voiceChannel.ts:remove()");
	}
};

/*
 *
 * Voice Channel CRUD
 * =====================
 * Update user from voicechannel DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {DiscordVoiceChannelInterface} user - user info to update
 * */

const update = async (
	search: Record<string, number | string | boolean>,
	user: DiscordVoiceChannelInterface,
): Promise<void> => {
	try {
		await query.findOneAndUpdate(search, user, function (error: string) {
			if (error) {
				logger.error(error || "");
			}
		});
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "voiceChannel.ts:update()");
	}
};

/*
 *
 * Voice Channel CRUD
 * =====================
 * Get user from voice channel DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return { DiscordVoiceChannelInterface} user. */

const get = async (search: Record<string, number | string | boolean>): Promise<DiscordVoiceChannelInterface> => {
	try {
		if (Object.keys(search).length > 0) {
			const user = await query.findOne(search, { _id: 0, __v: 0 }, {}, function (error: string) {
				if (error) {
					logger.error(JSON.stringify(error || ""), "voicechannel.ts:get()");
				}
			});
			return (await user.toObject()) || new query().toJSON();
		} else {
			const users = await query.find(search, { _id: 0, __v: 0 }, function (error: string) {
				if (error) {
					logger.error(JSON.stringify(error || ""), "voicechannel.ts:get()");
				}
			});
			return (await users) || [];
		}
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "voicechannel.ts:get()");
	}

	return new query().toJSON();
};
/*
 *
 * Voice Channel CRUD
 * =====================
 * Get all user from voicechannel from DB
 *
 * @return {DiscordVoiceChannelInterface[]} users.
 *  */

const getAll = async (): Promise<DiscordVoiceChannelInterface[]> => {
	try {
		const users = await query.find({}, { _id: 0, __v: 0 }, function (error: string) {
			if (error) {
				logger.error(JSON.stringify(error || ""), "voicechannel.ts:get()");
			}
		});
		return (await users) || [];
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "voicechannel.ts:get()");
	}

	return new query().toJSON();
};

export { get, update, remove, add, getAll };
export default { get, update, remove, add, getAll };
