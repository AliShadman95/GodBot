import { SlashCommandBuilder } from "@discordjs/builders";

const valstats = new SlashCommandBuilder()
	.setName("valstats")
	.setDescription("Ottieni informazioni su un giocatore di Valorant")
	.addStringOption((option) =>
		option
			.setName("riot-id")
			.setDescription("Il nome utente del giocatore di Valorant incluso il tag")
			.setRequired(true),
	);

export { valstats };
export default { valstats };
