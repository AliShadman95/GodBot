import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
	data: new SlashCommandBuilder().setName("info").setDescription("Mostra le informazioni sul bot"),
};
