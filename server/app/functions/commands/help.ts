import discord from "@routes/api/discord";
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js";

/**
 * command: !help
 * =====================
 * Help command
 *
 * @param ctx
 */
const help = async (ctx): Promise<void> => {
	const isFromSelect = ctx.isSelectMenu();

	const selectedPlugin = isFromSelect ? ctx.values[0] : ctx.options.getString("plugin_name");

	switch (selectedPlugin) {
		case "rank":
			rankHelp(ctx, isFromSelect);
			break;
		case "generale":
			generaleHelp(ctx, isFromSelect);
			break;
		case "economy":
			economyHelp(ctx, isFromSelect);
			break;
		case "games":
			gameHelp(ctx, isFromSelect);
			break;
		default:
			mainHelp(ctx);
			break;
	}
};

const rankHelp = (ctx, isFromSelect: boolean) => {
	const embedMessage = new MessageEmbed()
		.setColor("#0099ff")
		.setDescription("Questo plugin ti permette di ottenere punti esperienza partecipando nelle chat.")
		.setAuthor({ name: "GODBOT - Rank", iconURL: "https://cdn-icons-png.flaticon.com/512/2534/2534504.png" })
		.addFields(
			{ name: "`/rank (utente opzionale)`", value: "Ottieni il tuo rank o quello di un'altra persona." },

			{ name: "`/givexp (utente opzionale) [punti]`", value: "Assegna dei punti a te o a qualcun'altro." },

			{
				name: "`/removexp (utente opzionale) [punti]`",
				value: "Rimuovi dei punti a te o a qualcun'altro.",
			},

			{ name: "`/leaderboard`", value: "Ottieni un link per accedere alla leaderboard." },
		);

	if (isFromSelect) {
		discord.api.interactions.followUp(ctx, [embedMessage]);
		return;
	}
	discord.api.interactions.sendEmbeded(ctx, [embedMessage]);
};
const economyHelp = (ctx, isFromSelect: boolean) => {
	const embedMessage = new MessageEmbed()
		.setColor("#0099ff")
		.setDescription("Questo plugin ti permette di ottenere monete e usarle per ricevere ricompense.")
		.setAuthor({ name: "GODBOT - Economy", iconURL: "https://cdn-icons-png.flaticon.com/512/2534/2534504.png" })
		.addFields(
			{ name: "`/daily`", value: "Ottieni le tue monete giornaliere." },
			{ name: "`/weekly`", value: "Ottieni le tue monete settimanali." },
			{ name: "`/coins (utente opzionale)`", value: "Mostra le tue monete o quelle di un'altra persona." },
		);

	if (isFromSelect) {
		discord.api.interactions.followUp(ctx, [embedMessage]);
		return;
	}
	discord.api.interactions.sendEmbeded(ctx, [embedMessage]);
};

const gameHelp = (ctx, isFromSelect: boolean) => {
	const embedMessage = new MessageEmbed()
		.setColor("#0099ff")
		.setDescription("Lista di tutti i giochi disponibili.")
		.setAuthor({ name: "GODBOT - Games", iconURL: "https://cdn-icons-png.flaticon.com/512/2534/2534504.png" })
		.addFields(
			{ name: "`/dice [coins]`", value: "Tira dei dadi e tenta la fortuna!" },
			{ name: "`/guess [coins]`", value: "Indovina un numero da 1 a 100!" },
		);

	if (isFromSelect) {
		discord.api.interactions.followUp(ctx, [embedMessage]);
		return;
	}
	discord.api.interactions.sendEmbeded(ctx, [embedMessage]);
};

const generaleHelp = (ctx, isFromSelect: boolean) => {
	const embedMessage = new MessageEmbed()
		.setColor("#0099ff")
		.setDescription("Comandi generali del bot.")
		.setAuthor({
			name: "GODBOT - Generale",
			iconURL: "https://cdn-icons-png.flaticon.com/512/2534/2534504.png",
		})
		.addFields(
			{ name: "`/info`", value: "Ottieni informazioni riguardo al bot." },

			{ name: "`/versione`", value: "Ottieni la versione del bot." },
		);

	if (isFromSelect) {
		discord.api.interactions.followUp(ctx, [embedMessage]);
		return;
	}
	discord.api.interactions.sendEmbeded(ctx, [embedMessage]);
};

const mainHelp = (ctx) => {
	const embedMessage = new MessageEmbed()
		.setColor("#0099ff")
		.setAuthor({
			name: "GODBOT - Comandi",
			iconURL: "https://cdn-icons-png.flaticon.com/512/2534/2534504.png",
		})
		.addFields(
			{ name: "Rank", value: "`/help rank`", inline: true },
			{ name: "Economy", value: "`/help economy`", inline: true },
			{ name: "Generale", value: "`/help generale`", inline: true },
			{ name: "Games", value: "`/help games`", inline: true },
		);

	const row = new MessageActionRow().addComponents(
		new MessageSelectMenu()
			.setCustomId("plugin_name")
			.setPlaceholder("Seleziona")
			.addOptions([
				{
					label: "Rank",
					description: "Ottieni punti esperienza partecipando nelle chat.",
					value: "rank",
				},
				{
					label: "Economy",
					description: "Ottieni monete e usali per comprare ricompense!",
					value: "economy",
				},
				{
					label: "Generale",
					description: "Comandi generali del bot.",
					value: "generale",
				},
				{
					label: "Games",
					description: "Lista dei giochi disponibili.",
					value: "games",
				},
			]),
	);

	discord.api.interactions.sendEmbeded(ctx, [embedMessage], [row]);
};

export { help };
export default help;
