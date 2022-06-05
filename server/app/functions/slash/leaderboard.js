// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder().setName("leaderboard").setDescription("Mostra la leaderboard"),
};
