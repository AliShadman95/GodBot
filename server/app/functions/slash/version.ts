import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
	data: new SlashCommandBuilder().setName("versione").setDescription("Mostra la versione del bot"),
};
