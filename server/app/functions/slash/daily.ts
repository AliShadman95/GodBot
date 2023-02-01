import { SlashCommandBuilder } from "@discordjs/builders";

const daily = new SlashCommandBuilder().setName("daily").setDescription("Ottieni le monete giornaliere");

export { daily };
export default { daily };
