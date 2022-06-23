/**
 * Database Api Routes
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
import voiceChannel from "@app/functions/api/database/voiceChannel";
import economy from "@app/functions/api/database/economy";

const db = {
	connection: connection,
	rank: rank,
	settings: settings,
	users: users,
	voiceChannel: voiceChannel,
	economy: economy,
};

export { db };
export default db;
