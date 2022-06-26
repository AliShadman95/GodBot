import { SlashCommandBuilder } from "@discordjs/builders";

const dice = new SlashCommandBuilder()
	.setName("dice")
	.setDescription("Tira dei dadi e tenta la fortuna!")
	.addIntegerOption((option) => option.setName("coins").setDescription("Quanto vuoi puntare?").setRequired(true));

export { dice };
export default { dice };
