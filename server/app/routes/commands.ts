import commandsHandler from "@app/functions/commands/commandsHandler";
import launch from "@app/functions/commands/launch";
import giveXp from "@app/functions/commands/givexp";
import leaderboard from "@app/functions/commands/leaderboard";
import rank from "@app/functions/commands/rank";
import voiceDetection from "@app/functions/commands/voiceDetection";
import removeXp from "@app/functions/commands/removeXp";
import version from "@app/functions/commands/version";
import help from "@app/functions/commands/help";
import info from "@app/functions/commands/info";

const commands = {
	commandsHandler,
	launch,
	giveXp,
	leaderboard,
	voiceDetection,
	rank,
	removeXp,
	version,
	help,
	info,
};

export { commandsHandler, launch, voiceDetection, removeXp, leaderboard, rank, giveXp, version, help, info };
export default commands;
