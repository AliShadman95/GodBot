// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("rank")
		.setDescription("Mostra la tua carta del rank o di un altro utente")
		.addUserOption((option) =>
			option.setName("utente").setDescription("L'utente per la quale vuoi vedere il rank"),
		),
};
