/**
 * Launch
 * =====================
 *
 * Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/token";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import logger from "@app/functions/utils/logger";
import { givexp } from "../slash/givexp";
import { version } from "../slash/version";
import { info } from "../slash/info";
import { help } from "../slash/help";
import { leaderboard } from "../slash/leaderboard";
import { removexp } from "../slash/removexp";
import { rank } from "../slash/rank";
import { daily } from "../slash/daily";
import { weekly } from "../slash/weekly";
import { coins } from "../slash/coins";
import { dice } from "../slash/dice";

const registerCommands = async () => {
	const commands = [
		givexp.toJSON(),
		help.toJSON(),
		info.toJSON(),
		leaderboard.toJSON(),
		removexp.toJSON(),
		rank.toJSON(),
		version.toJSON(),
		daily.toJSON(),
		weekly.toJSON(),
		coins.toJSON(),
		dice.toJSON(),
	];

	const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN || "");

	try {
		logger.info("Started refreshing application (/) commands", "launch.ts:launch()");

		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID || "", process.env.GUILD_ID || ""), {
			body: commands,
		});
		logger.info("Successfully reloaded application (/) commands.", "launch.ts:launch()");
	} catch (error) {
		console.log(error);
		logger.error("Error in creating slash commands", "launch.ts:launch()");
	}
};

/**
 * Run bot
 * =====================
 * Send welcome message
 *
 */
const launch = async (): Promise<void> => {
	logger.info("command: /launch", "launch.ts:launch()");

	bot.login(process.env.BOT_TOKEN);

	await registerCommands();
};

export { launch };
export default launch;
