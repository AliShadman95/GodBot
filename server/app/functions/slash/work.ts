import { SlashCommandBuilder } from "@discordjs/builders";

const work = new SlashCommandBuilder().setName("work").setDescription("Lavora per un'ora e ottieni delle monete");

export { work };
export default { work };
