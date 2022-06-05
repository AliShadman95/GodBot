import { SlashCommandBuilder } from "@discordjs/builders";

const leaderboard = new SlashCommandBuilder().setName("leaderboard").setDescription("Mostra la leaderboard");

export { leaderboard };
export default { leaderboard };
