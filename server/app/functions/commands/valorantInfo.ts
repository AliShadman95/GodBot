import discord from "@routes/api/discord";
import configs from "@app/configs/config";

/**
 * command: !valorantinfo
 * =====================
 * Get info about a valorant player
 *
 * @param ctx
 */
const valorantInfo = async (ctx): Promise<void> => {
	/* discord.api.interactions.send(
		ctx,
		`Ecco il link per accedere alla leaderboard: ${process.env.FRONTEND_URL}/leaderboard/${Math.floor(
			Math.random() * 10,
		)}`,
		"",
	); */
};

export { valorantInfo };
export default valorantInfo;
