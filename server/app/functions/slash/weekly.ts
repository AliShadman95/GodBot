import { SlashCommandBuilder } from "@discordjs/builders";

const weekly = new SlashCommandBuilder().setName("weekly").setDescription("Ottieni le monete settimanali");

export { weekly };
export default { weekly };
