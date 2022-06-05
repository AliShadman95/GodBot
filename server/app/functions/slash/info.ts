import { SlashCommandBuilder } from "@discordjs/builders";

const info = new SlashCommandBuilder().setName("info").setDescription("Mostra le informazioni sul bot");

export { info };
export default { info };
