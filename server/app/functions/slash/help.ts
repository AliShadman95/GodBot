import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Ottieni la lista di comandi disponibili")
		.addStringOption((option) =>
			option.setName("plugin_name").setDescription("Nome del plugin per cui vuoi vedere la lista di comandi"),
		),
};
