import discord from "@routes/api/discord";
import db from "@routes/api/database";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const wait = require("node:timers/promises").setTimeout;

/**
 * command: /dice
 * =====================
 * Play the dice game
 *
 * @param ctx
 */
const dice = async (ctx): Promise<void> => {
	const selectedUser = ctx.user;
	const selectedCoins = ctx.options.getInteger("coins");

	const user = await db.economy.get({ id: selectedUser.id });
	const settings = await db.settings.get({});

	const guild = await discord.api.guild.getGuild();
	const coinEmoji = guild.emojis.cache.find((emoji) => emoji.name === "godbot");
	const coinName = settings?.economy?.coinName;

	if (!coinEmoji) {
		discord.api.interactions.send(
			ctx,
			"Non sono riuscito a trovare l'emoji delle monete. Controlla che sia presente nel server.",
			"",
		);
		return;
	}

	const min = 1;
	const max = 6;

	const userFirstDice = Math.floor(Math.random() * (max - min + 1) + min);
	const userSecondDice = Math.floor(Math.random() * (max - min + 1) + min);

	const botFirstDice = Math.floor(Math.random() * (max - min + 1) + min);
	const botSecondDice = Math.floor(Math.random() * (max - min + 1) + min);

	const isDraw = userFirstDice + userSecondDice === botFirstDice + botSecondDice;
	const hasPlayerWon = userFirstDice + userSecondDice > botFirstDice + botSecondDice;
	const hasPlayerRolledDouble = userFirstDice === userSecondDice;
	const hasPlayerRolledTwoSix = userFirstDice === 6 && userSecondDice === 6;

	let newCoins = parseInt(user.coins) - selectedCoins;

	if (hasPlayerWon) {
		if (hasPlayerRolledDouble) {
			if (hasPlayerRolledTwoSix) {
				newCoins += selectedCoins * 4;
			} else {
				newCoins += selectedCoins * 3;
			}
		} else {
			newCoins += selectedCoins * 2;
		}
	}

	if (isDraw) {
		newCoins += selectedCoins;
	}

	discord.api.interactions.send(
		ctx,
		`🎲 ${selectedUser.username} punta ${selectedCoins} ${coinName} ${coinEmoji} e tira i dadi...`,
		"",
	);

	await wait(3000);

	discord.api.interactions.updateReply(
		ctx,
		`🎲 ${selectedUser.username} ottiene **${userFirstDice}** e **${userSecondDice}**...`,
	);

	await wait(3000);

	discord.api.interactions.updateReply(
		ctx,
		`🎲 ${selectedUser.username}, il tuo avversario tira i dati e... ottiene **${botFirstDice}** e **${botSecondDice}**...`,
	);

	await wait(3000);

	discord.api.interactions.updateReply(
		ctx,
		`🎲 ${selectedUser.username}, ${
			hasPlayerWon
				? `hai ***vinto*** ${newCoins - parseInt(user.coins)} ${coinName} ${coinEmoji}`
				: isDraw
				? `hai ***pareggiato*** e hai ottenuto 0 ${coinName} ${coinEmoji}`
				: `hai ***perso*** ${parseInt(user.coins) - newCoins} ${coinName} ${coinEmoji}`
		}`,
	);
};

export { dice };
export default dice;
