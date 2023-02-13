import discord from "@routes/api/discord";
import { generateValorantStats } from "@app/functions/canvas/generateValorantStats";
import valorant from "@routes/api/valorant";

/**
 * command: !valstats
 * =====================
 * Get info about a valorant player
 *
 * @param ctx
 */
const valstats = async (ctx): Promise<void> => {
	await ctx.deferReply();

	const selectedUser = ctx.options.getString("riot-id") || ctx.user;

	if (!selectedUser || !selectedUser.includes("#") || selectedUser.split("#").length !== 2) {
		discord.api.interactions.updateReply(ctx, "Riot ID non valido!", "");
		return;
	}

	const name = selectedUser.split("#")[0];
	const tag = selectedUser.split("#")[1];

	const stats = await valorant.api.matches.getStats(name, tag);
	const modes = await valorant.api.assets.getModes();

	if (!stats || !modes) {
		discord.api.interactions.updateReply(
			ctx,
			"Riot ID non valido o limite raggiunto, riprovare fra un minuto!",
			"",
		);
		return;
	}

	const card = await generateValorantStats(stats, modes);

	discord.api.interactions.updateReply(ctx, "", card);
};

export { valstats };
export default valstats;
