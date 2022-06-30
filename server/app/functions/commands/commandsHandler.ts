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
import db from "@routes/api/database";
import games from "@app/routes/games";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const wait = require("node:timers/promises").setTimeout;

/**
 * Command Handler
 * =====================
 * The command handler
 *
 */
const commandsHandler = async (): Promise<void> => {
	bot.on("messageCreate", async (ctx): Promise<void> => {
		const gamesDb = await db.games.get({});

		if (gamesDb?.guess.some((game) => game.userId === discord.api.message.getUserID(ctx)) && Number(ctx.content)) {
			await games.guess(ctx.content, gamesDb?.guess);
		}

		if (discord.api.message.isBot(ctx)) {
			return;
		}
		if (!discord.api.message.isCommand(ctx.content)) {
			await addPointsHandler(ctx);
			return;
		}
	});

	bot.on("interactionCreate", async (ctx): Promise<void> => {
		if (discord.api.interactions.isBot(ctx) || (!ctx.isCommand() && !ctx.isSelectMenu())) {
			return;
		}

		// Se è un comando testuale
		if (!ctx.isSelectMenu()) {
			switch (ctx.commandName) {
				case "rank":
					commands.rank(ctx);
					break;
				case "givexp":
					commands.giveXp(ctx);
					break;
				case "removexp":
					commands.removeXp(ctx);
					break;
				case "leaderboard":
					commands.leaderboard(ctx);
					break;
				case "help":
					commands.help(ctx);
					break;
				case "versione":
					commands.version(ctx);
					break;
				case "info":
					commands.info(ctx);
					break;
				case "daily":
					commands.daily(ctx);
					break;
				case "weekly":
					commands.weekly(ctx);
					break;
				case "coins":
					commands.coins(ctx);
					break;
				case "dice":
					commands.dice(ctx);
					break;
				case "guess":
					commands.guess(ctx);
					break;
				default:
					break;
			}
		} else {
			// Se è un comando selezionato dalla select
			switch (ctx.customId) {
				case "plugin_name":
					await ctx.deferUpdate();
					await wait(300);
					commands.help(ctx);
					discord.api.interactions.resetSelectInteraction(ctx);
					break;
			}
		}
	});
};

export { commandsHandler };
export default commandsHandler;
