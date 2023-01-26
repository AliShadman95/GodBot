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
import type { DiscordEconomyInterface } from "@app/types/databases.type";
import { logger } from "@app/functions/utils/logger";

const schema = new Schema<DiscordEconomyInterface>({
	id: { type: String, default: "0" },
	bot: { type: Boolean, default: false },
	username: { type: String, default: "" },
	avatar: { type: String, default: "" },
	coins: { type: String, default: "0" },
	discriminator: { type: String, default: "" },
	lastDailyReward: { type: Number, default: 0 },
	lastWeeklyReward: { type: Number, default: 0 },
	lastWorkTime: { type: Number, default: 0 },
});

const query = model<DiscordEconomyInterface>("Economy", schema, "economy");

/*
 *
 * Economy CRUD
 * =====================
 * Add user to DB
 *
 * @param {DiscordEconomyInterface} user - user to add
 * */

const add = async (user: DiscordEconomyInterface): Promise<void> => {
	try {
		const doc = new query(user);
		await doc.save();
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "economy.ts:add()");
	}
};

/*
 *
 * Economy CRUD
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
		logger.error(JSON.stringify(error || ""), "economy.ts:remove()");
	}
};

/*
 *
 * Economy CRUD
 * =====================
 * Update user from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {DiscordEconomyInterface} user - user info to update
 * */

const update = async (
	search: Record<string, number | string | boolean>,
	user: DiscordEconomyInterface,
): Promise<void> => {
	try {
		await query.findOneAndUpdate(search, user, function (error: string) {
			if (error) {
				logger.error(error || "");
			}
		});
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "economy.ts:update()");
	}
};

/*
 *
 * Economy CRUD
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
		logger.error(JSON.stringify(error || ""), "economy.ts:updateMany()");
	}
};

/*
 *
 * Economy CRUD
 * =====================
 * Get user from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return { DiscordEconomyInterface} user. */

const get = async (search: Record<string, number | string | boolean>): Promise<DiscordEconomyInterface> => {
	try {
		if (Object.keys(search).length > 0) {
			const user = await query.findOne(search, { _id: 0, __v: 0 }, {}, function (error: string) {
				if (error) {
					logger.error(JSON.stringify(error || ""), "economy.ts:get()");
				}
			});
			return (await user.toObject()) || new query().toJSON();
		} else {
			const users = await query.find(search, { _id: 0, __v: 0 }, function (error: string) {
				if (error) {
					logger.error(JSON.stringify(error || ""), "economy.ts:get()");
				}
			});
			return (await users) || [];
		}
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "economy.ts:get()");
	}

	return new query().toJSON();
};
/*
 *
 * Economy CRUD
 * =====================
 * Get all user from DB
 *
 * @return {DiscordEconomyInterface[] |} users.
 *  */

const getAll = async (): Promise<DiscordEconomyInterface[]> => {
	try {
		const users = await query.find({}, { _id: 0, __v: 0 }, function (error: string) {
			if (error) {
				logger.error(JSON.stringify(error || ""), "economy.ts:get()");
			}
		});
		return (await users) || [];
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "economy.ts:get()");
	}

	return new query().toJSON();
};

export { get, update, remove, add, getAll, updateMany };
export default { get, update, remove, add, getAll, updateMany };
