import { SlashCommandBuilder } from "@discordjs/builders";

const guess = new SlashCommandBuilder()
	.setName("guess")
	.setDescription("Indovino il numero e tenta la fortuna!")
	.addIntegerOption((option) => option.setName("coins").setDescription("Quanto vuoi puntare?").setRequired(true));

export { guess };
export default { guess };
