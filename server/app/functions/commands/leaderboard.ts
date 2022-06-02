import discord from "@routes/api/discord";
import db from "@routes/api/database";
import bot from "@app/core/token";
import configs from "@app/configs/config";

/**
 * command: !lwaderboard
 * =====================
 * Give a link to the leaderboard
 *
 * @param ctx
 */
const leaderboard = async (ctx): Promise<void> => {
	discord.api.interactions.send(
		ctx,
		`Ecco il link per accedere alla leaderboard: ${configs.frontend.url}/leaderboard/${Math.floor(
			Math.random() * 10,
		)}`,
		"",
	);
};

export { leaderboard };
export default leaderboard;
