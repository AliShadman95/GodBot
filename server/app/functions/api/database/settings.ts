/**
 * Settings database
 * =====================
 *
 * Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import { Schema, model } from "mongoose";
import type { DiscordSettingsInterface } from "@app/types/databases.type.js";
import { logger } from "@app/functions/utils/logger";

const schema = new Schema<DiscordSettingsInterface>({
	rank: { type: Object, default: {} },
	economy: { type: Object, default: {} },
});

const query = model<DiscordSettingsInterface>("Settings", schema, "settings");

/*
 *
 * Settings CRUD
 * =====================
 * Add settings to DB
 *
 * @param {SettingsInterface} settings - settings to add
 */
const add = async (settings: DiscordSettingsInterface): Promise<void> => {
	try {
		const doc = new query(settings);
		await doc.save();
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "settings.ts:add()");
	}
};

/**
 * Settings CRUD
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
		logger.error(JSON.stringify(error || ""), "settings.ts:remove()");
	}
};

/**
 * Settings CRUD
 * =====================
 * Update settings from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @param {SettingsInterface} settings - settings info to update
 */
const update = async (
	search: Record<string, number | string | boolean>,
	settings: DiscordSettingsInterface,
): Promise<void> => {
	try {
		await query.findOneAndUpdate(search, settings, function (error: string) {
			if (error) {
				logger.error(error || "");
			}
		});
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "settings.ts:update()");
	}
};

/**
 * Settings CRUD
 * =====================
 * Get settings from DB
 *
 * @param {Record<string, number | string | boolean>} search - search condition e.g {id:"123"}
 * @return {SettingsInterface[]} settings.

 */
const get = async (search: Record<string, number | string | boolean>): Promise<DiscordSettingsInterface> => {
	try {
		const settings = await query.findOne(search, { _id: 0, __v: 0 }, function (error: string) {
			if (error) {
				logger.error(JSON.stringify(error || ""), "settings.ts:get()");
			}
		});
		return (await settings) || new query().toJSON();
	} catch (error: any) {
		logger.error(JSON.stringify(error || ""), "settings.ts:get()");
	}
	return new query().toJSON();
};

export { get, update, remove, add };
export default { get, update, remove, add };
