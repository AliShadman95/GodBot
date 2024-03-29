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
import valstats from "@app/functions/commands/valstats";
import daily from "@app/functions/commands/daily";
import weekly from "@app/functions/commands/weekly";
import coins from "@app/functions/commands/coins";
import dice from "@app/functions/commands/dice";
import guess from "@app/functions/commands/guess";
import work from "@app/functions/commands/work";

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
	valstats,
	daily,
	weekly,
	coins,
	dice,
	guess,
	work,
};

export {
	commandsHandler,
	launch,
	voiceDetection,
	removeXp,
	leaderboard,
	rank,
	giveXp,
	version,
	help,
	info,
	valstats,
	daily,
	weekly,
	coins,
	dice,
	guess,
	work,
};
export default commands;
