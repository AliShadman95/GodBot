import discord from "@routes/api/discord";
import db from "@routes/api/database";

/**
 * command: !givexp
 * =====================
 * Give xp to user.
 *
 * @param ctx
 */
const giveXp = async (ctx): Promise<void> => {
	const selectedUser = ctx.options.getUser("utente") || ctx.user;
	const selectedPoints = ctx.options.getInteger("punti");

	const settings = await db.settings.get({});

	const guild = await discord.api.guild.getGuild();
	const guildMember = guild.members.cache.get(selectedUser.id);
	const hasRole = guildMember?.roles.cache.some((role) => settings?.rank?.giveXpEnabledRoles.includes(role.id));

	if (!hasRole) {
		discord.api.interactions.send(ctx, "Non hai il permesso per usare questo comando!", "");
		return;
	}

	let user = await db.rank.get({ username: selectedUser.username });

	if (user.id === "0") {
		await db.rank.add({ ...selectedUser, points: "0", messageAwarded: 0, secondsInVoiceChat: 0 });
		user = await db.rank.get({ username: selectedUser.username });
	}

	await db.rank.update(
		{ username: selectedUser.username },
		{ ...user, points: (parseInt(user.points) + parseInt(selectedPoints)).toString() },
	);

	discord.api.interactions.send(
		ctx,
		settings?.rank?.giveXpMessage
			.replace("{user}", selectedUser.username)
			.replace("{punti}", (parseInt(user.points) + parseInt(selectedPoints)).toString()),

		"",
	);
};

export { giveXp };
export default giveXp;
