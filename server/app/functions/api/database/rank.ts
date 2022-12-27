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
import type { DiscordRankInterface } from "@app/types/databases.type";
import { logger } from "@app/functions/utils/logger";

const schema = new Schema<DiscordRankInterface>({
	id: { type: String, default: "0" },
	bot: { type: Boolean, default: false },
	username: { type: String, default: "" },
	avatar: { type: String, default: "" },
	points: { type: String, default: "0" },
	messageAwarded: { type: Number, default: 0 },
	secondsInVoiceChat: { type: Number, default: 0 },
	discriminator: { type: String, default: "" },
});

const query = model<DiscordRankInterface>("Rank", schema, "ranks");

/*
 *
 * Ranks CRUD
 * =====================
 * Add user to DB
 *
 * @param {DiscordRankInterface} user - user to add
 * */

const add = async (user: DiscordRankInterface): Promise<void> => {
	try {
		const doc = new query(user);
		await doc.save();
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "rank.ts:add()");
	}
};

/*
 *
 * Ranks CRUD
 * =====================
 * Remove user from DB
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
		logger.error(JSON.stringify(error || ""), "ranks.ts:remove()");
	}
};

/*
 *
 * Ranks CRUD
 * =====================
 * Update user from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {TelegramUserInterface} user - user info to update
 * */

const update = async (search: Record<string, number | string | boolean>, user: DiscordRankInterface): Promise<void> => {
	try {
		await query.findOneAndUpdate(search, user, function (error: string) {
			if (error) {
				logger.error(error || "");
			}
		});
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "ranks.ts:update()");
	}
};

/*
 *
 * Ranks CRUD
 * =====================
 * Update many users from DB
 *
 * @param {Record<string, number | string | boolean | Record>} inM - List of users to update
 * @param {Record<string, number | string | boolean>} set - the field to change
 * */

const updateMany = async (
	inM: Record<string, number | string | boolean | any>,
	set: Record<string, number | string | boolean | any>,
): Promise<void> => {
	try {
		await query.updateMany(inM, set, { multi: true }, function (error: string) {
			if (error) {
				logger.error(error || "");
			}
		});
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "ranks.ts:updateMany()");
	}
};

/*
 *
 * Users CRUD
 * =====================
 * Get user from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return { DiscordRankInterface} user. */

const get = async (search: Record<string, number | string | boolean>): Promise<DiscordRankInterface> => {
	try {
		if (Object.keys(search).length > 0) {
			const user = await query.findOne(search, { _id: 0, __v: 0 }, {}, function (error: string) {
				if (error) {
					logger.error(JSON.stringify(error || ""), "rank.ts:get()");
				}
			});
			return (await user.toObject()) || new query().toJSON();
		} else {
			const users = await query.find(search, { _id: 0, __v: 0 }, function (error: string) {
				if (error) {
					logger.error(JSON.stringify(error || ""), "rank.ts:get()");
				}
			});
			return (await users) || [];
		}
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "rank.ts:get()");
	}

	return new query().toJSON();
};
/*
 *
 * Users CRUD
 * =====================
 * Get all user from DB
 *
 * @return {DiscordRankInterface[] |} users.
 *  */

const getAll = async (): Promise<DiscordRankInterface[]> => {
	try {
		const users = await query
			.find({}, { _id: 0, __v: 0 }, function (error: string) {
				if (error) {
					logger.error(JSON.stringify(error || ""), "rank.ts:get()");
				}
			})
			.lean();
		return (await users) || [];
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "rank.ts:get()");
	}

	return new query().toJSON();
};

export { get, update, remove, add, getAll, updateMany };
export default { get, update, remove, add, getAll, updateMany };
