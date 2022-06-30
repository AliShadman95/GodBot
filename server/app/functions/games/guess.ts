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
 */ 3;
const guess = async (message, guess): Promise<void> => {
	console.log(message, guess);

	if (parseInt(message) === parseInt(guess.numberToGuess)) {
		console.log("indovinato");
		return;
	}
	if (parseInt(message) > parseInt(guess.numberToGuess)) {
		console.log("il umero che cerchi è inferiore");
		return;
	}
	if (parseInt(message) < parseInt(guess.numberToGuess)) {
		console.log("Il numero che cerchi è maggiore");
		return;
	}

	/* const selectedUser = ctx.user;
	const selectedCoins = ctx.options.getInteger("coins");

	const user = await db.economy.get({ id: selectedUser.id });
	const settings = await db.settings.get({});

	const guild = await discord.api.guild.getGuild();
	const coinEmoji = guild.emojis.cache.find((emoji) => emoji.name === "godbot");
	const coinName = settings?.economy?.coinName;

	if (selectedCoins > parseInt(user.coins)) {
		discord.api.interactions.send(
			ctx,
			`🎲 ${selectedUser.username} non hai abbastanza ${settings?.economy?.coinName} ${coinEmoji} per giocare.`,
			"",
		);
		return;
	}

	if (!coinEmoji) {
		discord.api.interactions.send(
			ctx,
			"Non sono riuscito a trovare l'emoji delle monete. Controlla che sia presente nel server.",
			"",
		);
		return;
	}

	const min = 1;
	const max = 100;

	const winningNumber = Math.floor(Math.random() * (max - min + 1) + min);

	const games = await db.games.get({});

	const userGame = games?.guess.find((game) => game.userId === selectedUser.id);

	console.log(games);

	if (userGame) {
		discord.api.interactions.send(
			ctx,
			"Hai già una partita di guess in corso. Devi aspettare che finisca prima di giocare una nuova.",
			"",
		);
		return;
	}

	await db.games.update(
		{},
		{
			...games,
			guess: [
				...games.guess,
				{
					userId: selectedUser.id,
					username: selectedUser.username,
					attempts: 0,
					coinsPlayed: selectedCoins,
					numberToGuess: winningNumber.toString(),
				},
			],
		},
	);

	discord.api.interactions.send(
		ctx,
		`:thinking: ${selectedUser.username} punta ${selectedCoins} ${coinName} ${coinEmoji} e aziona la mistery machine...`,
		"",
	);

	await wait(3000);

	discord.api.interactions.updateReply(
		ctx,
		`:thinking: ${selectedUser.username}, la mistery machine è pronta, hai ***5 tentativi*** per indovinare il numero da 1 a 100... Scrivi un numero`,
	); */
};

export { guess };
export default guess;
