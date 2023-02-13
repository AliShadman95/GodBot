/**
 * Router Wrapper telegram api (message)
 * =====================
 *
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */

import matches from "@app/functions/api/valorant/matches";
import account from "@app/functions/api/valorant/account";
import assets from "@app/functions/api/valorant/assets";

const valorant = {
	api: {
		matches: matches,
		account: account,
		assets: assets,
	},
};

export { valorant };
export default valorant;
