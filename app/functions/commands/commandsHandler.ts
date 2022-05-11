/**
 * Start
 * =====================
 *
 *
 * @license: MIT License
 *
 */
import bot from "@app/core/token";
import discord from "@routes/api/discord";
import commands from "@app/routes/commands";

/**
 * Command Handler
 * =====================
 * The command handler
 *
 */
const commandsHandler = async (): Promise<void> => {
	bot.on("messageCreate", async (message): Promise<void> => {
		if (!discord.api.message.isCommand(message.content)) {
			return;
		}

		switch (message.content) {
			case "!rank":
				commands.rank(message);
				break;
			default:
				break;
		}
	});
};

export { commandsHandler };
export default commandsHandler;
