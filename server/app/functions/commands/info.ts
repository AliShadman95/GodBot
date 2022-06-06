import discord from "@routes/api/discord";
import { MessageEmbed } from "discord.js";

/**
 * command: !info
 * =====================
 * Get bot information
 *
 * @param ctx
 */
const info = async (ctx): Promise<void> => {
	const embedMessage = new MessageEmbed()
		.setColor("#0099ff")
		.setDescription(`Questo bot è stato appositamente sviluppato per il server ${ctx.member?.guild?.name}.`)
		.setAuthor({ name: "GODBOT - Info", iconURL: "https://cdn-icons-png.flaticon.com/512/2534/2534504.png" })
		.addFields(
			{
				name: "Configurazione",
				value: `Per configurare il bot, accedere a ${process.env.FRONTEND_URL}  In base all'utenza loggata è possibile modificare vari settaggi.`,
			},

			{
				name: "Bug",
				value: "Per segnalare bug, accedere a https://trello.com/b/EkuUaJeX/god-bot Creare un utenza Trello e richiedere l'accesso alla board. Inserire una card nella prima colonna denominata 'Bugs'",
			},
			{
				name: "Nuove funzioni",
				value: "Per suggerire nuove funzioni, seguire lo step indicato sopra e inserire una card nella seconda colonna denominata 'Backlog'",
			},
		)
		.setFooter({
			text: "Sviluppato da Alì Shadman [@AliShadman95]",
			iconURL: "https://cdn-icons-png.flaticon.com/512/2534/2534504.png",
		});

	discord.api.interactions.sendEmbeded(ctx, [embedMessage]);
};

export { info };
export default info;
