import discord from "@routes/api/discord";
import { generateValorantStats } from "@app/functions/canvas/generateValorantStats";
import valorant from "@routes/api/valorant";

/**
 * command: !valorantinfo
 * =====================
 * Get info about a valorant player
 *
 * @param ctx
 */
const valorantInfo = async (ctx): Promise<void> => {
	await ctx.deferReply();

	const stats = await valorant.api.matches.getStats("bax", "126");

	const card = await generateValorantStats(stats);

	discord.api.interactions.updateReply(ctx, "", card);
};

export { valorantInfo };
export default valorantInfo;
