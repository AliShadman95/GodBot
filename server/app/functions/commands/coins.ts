import discord from "@routes/api/discord";
import db from "@routes/api/database";

/**
 * command: /coins
 * =====================
 * Current coins of the user.
 *
 * @param ctx
 */
const coins = async (ctx): Promise<void> => {
	const selectedUser = ctx.options.getUser("utente") || ctx.user;

	if (selectedUser.bot) {
		discord.api.interactions.send(ctx, "Non puoi vedere il rank di un bot!", "");
		return;
	}

	const user = await db.economy.get({ id: selectedUser.id });

	const settings = await db.settings.get({});

	const guild = await discord.api.guild.getGuild();
	const coinEmoji = guild.emojis.cache.find((emoji) => emoji.name === "godbot");

	if (!coinEmoji) {
		discord.api.interactions.send(
			ctx,
			"Non sono riuscito a trovare l'emoji delle monete. Controlla che sia presente nel server.",
			"",
		);
		return;
	}

	discord.api.interactions.send(
		ctx,
		`${settings?.economy?.showCoinsMessage
			.replace("{user}", selectedUser.username)
			.replace("{coinsTotali}", `${user.coins} ${settings?.economy?.coinName} ${coinEmoji}`)}`,
		"",
	);
};

export { coins };
export default coins;
