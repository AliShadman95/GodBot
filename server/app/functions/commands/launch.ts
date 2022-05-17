/**
 * Launch
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/token";
import configs from "@configs/config";

import logger from "@app/functions/utils/logger";

/**
 * Run bot
 * =====================
 * Send welcome message
 *
 */
const launch = async (): Promise<void> => {
	logger.info("command: /launch", "launch.ts:launch()");

	bot.login(configs.discord.token);
};

export { launch };
export default launch;