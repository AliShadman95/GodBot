import { SlashCommandBuilder } from "@discordjs/builders";

const coins = new SlashCommandBuilder()
	.setName("coins")
	.setDescription("Mostra il totale delle tue moente o quelle di un altro utente")
	.addUserOption((option) => option.setName("utente").setDescription("L'utente per la quale vuoi vedere le monete"));

export { coins };
export default { coins };
