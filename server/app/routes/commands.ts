import commandsHandler from "@app/functions/commands/commandsHandler";
import launch from "@app/functions/commands/launch";
import giveXp from "@app/functions/commands/givexp";
import set from "@app/functions/commands/set";
import about from "@app/functions/commands/about";
import rank from "@app/functions/commands/rank";
import voiceDetection from "@app/functions/commands/voiceDetection";
import removeXp from "@app/functions/commands/removeXp";
import version from "@app/functions/commands/version";

const commands = {
	commandsHandler,
	launch,
	giveXp,
	set,
	voiceDetection,
	about,
	rank,
	removeXp,
	version,
};

export { commandsHandler, launch, voiceDetection, removeXp, set, about, rank, giveXp, version };
export default commands;
