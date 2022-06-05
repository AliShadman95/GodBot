// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Ottieni la lista di comandi disponibili")
		.addStringOption((option) =>
			option.setName("plugin_name").setDescription("Nome del plugin per cui vuoi vedere la lista di comandi"),
		),
};
