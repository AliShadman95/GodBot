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
import configs from "@configs/config";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import fs from "node:fs";
import logger from "@app/functions/utils/logger";
import path from "path";

const commands: any = [];
const commandFiles = fs.readdirSync(path.resolve(__dirname, "../slash/"));

for (const file of commandFiles) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const command = require(`../slash/${file}`);
	commands.push(command.data.toJSON());
}

/**
 * Run bot
 * =====================
 * Send welcome message
 *
 */
const launch = async (): Promise<void> => {
	logger.info("command: /launch", "launch.ts:launch()");

	bot.login(process.env.BOT_TOKEN);

	const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN || "");

	try {
		logger.info("Started refreshing application (/) commands", "launch.ts:launch()");

		await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID || "", process.env.GUILD_ID || ""), {
			body: commands,
		});
		logger.info("Successfully reloaded application (/) commands.", "launch.ts:launch()");
	} catch (error) {
		logger.error("Error in creating slash commands", "launch.ts:launch()");
	}
};

export { launch };
export default launch;
