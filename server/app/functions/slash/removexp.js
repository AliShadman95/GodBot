// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("removexp")
		.setDescription("Rimuovi una quantità di xp ad un utente")
		.addIntegerOption((option) =>
			option.setName("punti").setDescription("La quantità di xp da rimuovere").setRequired(true),
		)
		.addUserOption((option) => option.setName("utente").setDescription("L'utente a cui vuoi rimuovere l'xp")),
};
