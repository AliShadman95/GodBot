import { SlashCommandBuilder } from "@discordjs/builders";

module.exports = {
	data: new SlashCommandBuilder().setName("leaderboard").setDescription("Mostra la leaderboard"),
};
