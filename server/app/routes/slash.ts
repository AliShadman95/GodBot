import givexp from "@app/functions/slash/givexp";
import help from "@app/functions/slash/help";
import info from "@app/functions/slash/info";
import leaderboard from "@app/functions/slash/leaderboard";
import rank from "@app/functions/slash/rank";
import removexp from "@app/functions/slash/removexp";
import version from "@app/functions/slash/version";
import valorantInfo from "@app/functions/slash/valorantInfo";

const slash = {
	givexp,
	leaderboard,
	rank,
	removexp,
	version,
	help,
	info,
	valorantInfo,
};

export { info, help, version, removexp, leaderboard, rank, givexp, valorantInfo };
export default slash;
