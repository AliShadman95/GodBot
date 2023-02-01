/**
 * Guess database
 * =====================
 *
 * Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { Schema, model } from "mongoose";
import type { DiscordGamesInterface } from "@app/types/databases.type.js";
import { logger } from "@app/functions/utils/logger";

const schema = new Schema<DiscordGamesInterface>({
	guess: { type: Array, default: [] },
});

const query = model<DiscordGamesInterface>("Games", schema, "games");

/*
 *
 * Games CRUD
 * =====================
 * Add settings to DB
 *
 * @param {DiscordGamesInterface} games - games to add
 */
const add = async (games: DiscordGamesInterface): Promise<void> => {
	try {
		const doc = new query(games);
		await doc.save();
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "games.ts:add()");
	}
};

/**
 * Games CRUD
 * =====================
 * Remove settings from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 */
const remove = async (search: Record<string, number | string | boolean>): Promise<void> => {
	try {
		await query.findOneAndDelete(search, function (error: string) {
			if (error) {
				logger.error(error || "");
			}
		});
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "games.ts:remove()");
	}
};

/**
 * Games CRUD
 * =====================
 * Update games from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {DiscordGamesInterface} games - games to update
 * @param settings
 */
const update = async (
	search: Record<string, number | string | boolean>,
	games: DiscordGamesInterface,
): Promise<void> => {
	try {
		await query.findOneAndUpdate(search, games, function (error: string) {
			if (error) {
				logger.error(error || "");
			}
		});
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "games.ts:update()");
	}
};

/**
  * Games CRUD
  * =====================
  * Get games from DB
  *
  * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
  * @return {DiscordGamesInterface[]} settings.
 
  */
const get = async (search: Record<string, number | string | boolean>): Promise<DiscordGamesInterface> => {
	try {
		const games = await query.findOne(search, { _id: 0, __v: 0 }, function (error: string) {
			if (error) {
				logger.error(JSON.stringify(error || ""), "games.ts:get()");
			}
		});
		return (await games.toObject()) || new query().toJSON();
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "games.ts:get()");
	}
	return new query().toJSON();
};

export { get, update, remove, add };
export default { get, update, remove, add };
