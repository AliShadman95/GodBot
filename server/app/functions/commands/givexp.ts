import discord from "@routes/api/discord";
import db from "@routes/api/database";
import { generateRankCard } from "@app/functions/common/generateRankCard";

/**
 * command: !givexp
 * =====================
 * Give xp to user.
 *
 * @param message
 * @param ctx
 */
const giveXp = async (ctx): Promise<void> => {
	console.log("calling givexp");

	const typedUsername = ctx.content.split(" ")[1];
	const typedPoints = ctx.content.split(" ")[2];

	if (!typedUsername) {
		discord.api.message.send(ctx, "Inserire un utente valido (Es. !givexp pippo 10)", "");
		return;
	}
	if (!typedPoints) {
		discord.api.message.send(ctx, "Inserire dei punti (Es. !givexp pippo 10)", "");
		return;
	}

	const user = await db.rank.get({ username: typedUsername });

	if (user.id === "0") {
		discord.api.message.send(ctx, "Utente non trovato", "");
		return;
	}

	await db.rank.update(
		{ username: typedUsername },
		{ ...user, points: (parseInt(user.points) + parseInt(typedPoints)).toString() },
	);
};

export { giveXp };
export default giveXp;
