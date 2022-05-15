import commandsHandler from "@app/functions/commands/commandsHandler";
import launch from "@app/functions/commands/launch";
import settings from "@app/functions/commands/settings";
import set from "@app/functions/commands/set";
import about from "@app/functions/commands/about";
import rank from "@app/functions/commands/rank";
import voiceDetection from "@app/functions/commands/voiceDetection";
import privacy from "@app/functions/commands/privacy";
import version from "@app/functions/commands/version";

const commands = {
	commandsHandler,
	launch,
	settings,
	set,
	voiceDetection,
	about,
	rank,
	privacy,
	version,
};

export { commandsHandler, launch, voiceDetection, settings, set, about, rank, privacy, version };
export default commands;
