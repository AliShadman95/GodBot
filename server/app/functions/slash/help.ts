import { SlashCommandBuilder } from "@discordjs/builders";

const help = new SlashCommandBuilder()
	.setName("help")
	.setDescription("Ottieni la lista di comandi disponibili")
	.addStringOption((option) =>
		option.setName("plugin_name").setDescription("Nome del plugin per cui vuoi vedere la lista di comandi"),
	);

export { help };
export default { help };
