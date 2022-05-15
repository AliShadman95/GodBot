/**
 * Migration script for the database.
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import connection from "@app/functions/api/database/connection";
import rank from "@app/functions/api/database/rank";
import settings from "@app/functions/api/database/settings";
/* import settings from "@app/functions/api/database/settings";
import about from "@app/functions/api/database/about"; */

const db = {
	connection: connection,
	rank: rank,
	settings: settings,
	/* about: about,  */
};

export { db };
export default db;
