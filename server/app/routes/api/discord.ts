/**
 * Router Wrapper telegram api (message)
 * =====================
 *
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */

import message from "@app/functions/api/discord/message";
import bot from "@app/functions/api/discord/bot";
import interactions from "@app/functions/api/discord/interactions";

const discord = {
	api: {
		message: message,
		bot: bot,
		interactions: interactions,
	},
};

export { discord };
export default discord;
