import { SlashCommandBuilder } from "@discordjs/builders";

const rank = new SlashCommandBuilder()
	.setName("rank")
	.setDescription("Mostra la tua carta del rank o di un altro utente")
	.addUserOption((option) => option.setName("utente").setDescription("L'utente per la quale vuoi vedere il rank"));

export { rank };
export default { rank };
