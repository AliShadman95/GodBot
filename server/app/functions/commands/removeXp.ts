import discord from "@routes/api/discord";
import db from "@routes/api/database";

/**
 * command: !removexp
 * =====================
 * Remove xp from user.
 *
 * @param message
 * @param ctx
 */
const removeXp = async (ctx): Promise<void> => {
	const selectedUser = ctx.options.getUser("utente") || ctx.user;
	const selectedPoints = ctx.options.getInteger("punti");

	if (selectedUser.bot) {
		discord.api.interactions.send(ctx, "Non puoi rimuovere XP da un bot!", "");
		return;
	}

	const settings = await db.settings.get({});

	const guild = await discord.api.guild.getGuild();
	const guildMember = guild.members.cache.get(discord.api.interactions.getUserID(ctx));
	const hasRole = guildMember?.roles.cache.some((role) => settings?.rank?.giveXpEnabledRoles.includes(role.id));

	if (!hasRole) {
		discord.api.interactions.send(ctx, "Non hai il permesso per usare questo comando!", "");
		return;
	}

	let user = await db.rank.get({ id: selectedUser.id });

	if (user.id === "0") {
		await db.rank.add({
			...selectedUser,
			points: "0",
			messageAwarded: 0,
			secondsInVoiceChat: 0,
		});
		user = await db.rank.get({ id: selectedUser.id });
	}

	await db.rank.update(
		{ id: selectedUser.id },
		{
			...user,
			points: (parseInt(user.points) - parseInt(selectedPoints) <= 0
				? 0
				: parseInt(user.points) - parseInt(selectedPoints)
			).toString(),
		},
	);

	discord.api.interactions.send(
		ctx,
		settings?.rank?.removeXpMessage
			.replace("{user}", selectedUser.username)
			.replace(
				"{puntiTotali}",
				(parseInt(user.points) - parseInt(selectedPoints) <= 0
					? 0
					: parseInt(user.points) - parseInt(selectedPoints)
				).toString(),
			)
			.replace("{puntiRimossi}", selectedPoints),

		"",
	);
};

export { removeXp };
export default removeXp;
