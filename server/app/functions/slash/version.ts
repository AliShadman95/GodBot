import { SlashCommandBuilder } from "@discordjs/builders";

const version = new SlashCommandBuilder().setName("versione").setDescription("Mostra la versione del bot");

export { version };
export default { version };
