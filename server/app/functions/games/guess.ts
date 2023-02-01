import discord from "@routes/api/discord";
import db from "@routes/api/database";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const wait = require("node:timers/promises").setTimeout;

/**
 * Games: GUESS
 * =====================
 * Play the guess game
 *
 * @param ctx
 */

const guess = async (ctx, gamesDb): Promise<void> => {
	const { author: user, content: message } = ctx;
	const id = discord.api.message.getUserID(ctx);

	const settings = await db.settings.get({});
	const userEconomy = await db.economy.get({ id });

	const userGame = gamesDb?.guess.find((game) => game.userId === id);

	const guild = await discord.api.guild.getGuild();
	const coinEmoji = guild.emojis.cache.find((emoji) => emoji.name === "godbot");
	const coinName = settings?.economy?.coinName;

	// If there is not coin emoji
	if (!coinEmoji) {
		discord.api.interactions.send(
			ctx,
			"Non sono riuscito a trovare l'emoji delle monete. Controlla che sia presente nel server.",
			"",
		);
		return;
	}

	// If user win
	if (parseInt(message) === parseInt(userGame?.numberToGuess)) {
		await db.games.update(
			{},
			{
				...gamesDb,
				guess: gamesDb?.guess.filter((game) => game.userId !== discord.api.message.getUserID(ctx)),
			},
		);

		await db.economy.update(
			{ id },
			{ ...userEconomy, coins: (parseInt(userEconomy?.coins) + userGame?.coinsPlayed).toString() },
		);

		discord.api.interactions.send(
			ctx,
			`:tada: ${user?.username}, hai indovinato il numero e hai vinto ${
				userGame?.coinsPlayed
			} ${coinName} ${coinEmoji}! Complimenti, ora hai un totale di ${
				parseInt(userEconomy?.coins) + userGame?.coinsPlayed
			} ${coinName} ${coinEmoji}!`,
			"",
		);

		return;
	}

	// If user lose and don't have more attempts
	if (userGame?.attempts - 1 === 0) {
		await db.games.update(
			{},
			{
				...gamesDb,
				guess: gamesDb?.guess.filter((game) => game.userId !== discord.api.message.getUserID(ctx)),
			},
		);

		await db.economy.update(
			{ id },
			{ ...userEconomy, coins: (parseInt(userEconomy?.coins) - userGame?.coinsPlayed).toString() },
		);

		discord.api.interactions.send(
			ctx,
			`:thinking: ${user?.username}, non hai indovinato il numero e hai perso **${userGame?.coinsPlayed}** ${coinName} ${coinEmoji}! Il numero era **${userGame?.numberToGuess}**. :grimacing:`,
			"",
		);

		return;
	}

	await db.games.update(
		{},
		{
			...gamesDb,
			guess: gamesDb.guess.map((game) => (game.userId === id ? { ...game, attempts: game.attempts - 1 } : game)),
		},
	);

	discord.api.interactions.send(
		ctx,
		`:thinking: ${user?.username}, il numero che stai cercando di indovinare è **${
			parseInt(message) > parseInt(userGame?.numberToGuess) ? "inferiore" : "superiore"
		} a ${parseInt(message)}** \n *Hai ancora ${userGame?.attempts - 1} tentativi*.`,
		"",
	);
};

export { guess };
export default guess;
