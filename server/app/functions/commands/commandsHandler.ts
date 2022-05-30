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
import addPointsHandler from "@app/functions/common/addPointsHandler";

/**
 * Command Handler
 * =====================
 * The command handler
 *
 */
const commandsHandler = async (): Promise<void> => {
	bot.on("messageCreate", async (ctx): Promise<void> => {
		if (discord.api.message.isBot(ctx)) {
			return;
		}
		if (!discord.api.message.isCommand(ctx.content)) {
			await addPointsHandler(ctx);
			return;
		}
	});

	bot.on("interactionCreate", async (ctx): Promise<void> => {
		if (discord.api.message.isBot(ctx) || !ctx.isCommand()) {
			return;
		}

		const command = ctx.commandName;

		// Single commands
		switch (command) {
			case "rank":
				commands.rank(ctx);
				break;
			case "givexp":
				commands.giveXp(ctx);
				break;
			case "removexp":
				commands.removeXp(ctx);
				break;
			default:
				break;
		}
	});
};

export { commandsHandler };
export default commandsHandler;
