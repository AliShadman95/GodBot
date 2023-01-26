import { SlashCommandBuilder } from "@discordjs/builders";

const valorantInfo = new SlashCommandBuilder()
	.setName("valorantinfo")
	.setDescription("Ottieni informazioni su un giocatore di Valorant")
	.addStringOption((option) =>
		option
			.setName("username")
			.setDescription("Il nome utente del giocatore di Valorant incluso il tag")
			.setRequired(true),
	);

export { valorantInfo };
export default { valorantInfo };
