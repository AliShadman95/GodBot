/**
 * Migration script for the database.
 * =====================
 *
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import connection from "@app/functions/api/database/connection";
import rank from "@app/functions/api/database/rank";
import settings from "@app/functions/api/database/settings";
import users from "@app/functions/api/database/users";

const db = {
	connection: connection,
	rank: rank,
	settings: settings,
	users: users,
};

export { db };
export default db;
