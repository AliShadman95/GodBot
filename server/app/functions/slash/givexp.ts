import { SlashCommandBuilder } from "@discordjs/builders";

const givexp = new SlashCommandBuilder()
	.setName("givexp")
	.setDescription("Assegna una quantità di xp ad un utente")
	.addIntegerOption((option) =>
		option.setName("punti").setDescription("La quantità di xp da assegnare").setRequired(true),
	)
	.addUserOption((option) => option.setName("utente").setDescription("L'utente a cui vuoi assegnare l'xp"));

export { givexp };
export default { givexp };
