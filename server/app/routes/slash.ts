import givexp from "@app/functions/slash/givexp";
import help from "@app/functions/slash/help";
import info from "@app/functions/slash/info";
import leaderboard from "@app/functions/slash/leaderboard";
import rank from "@app/functions/slash/rank";
import removexp from "@app/functions/slash/removexp";
import version from "@app/functions/slash/version";
import daily from "@app/functions/slash/daily";
import weekly from "@app/functions/slash/weekly";
import coins from "@app/functions/slash/coins";
import dice from "@app/functions/slash/dice";

const slash = {
	givexp,
	leaderboard,
	rank,
	removexp,
	version,
	help,
	info,
	daily,
	weekly,
	coins,
	dice,
};

export { info, help, version, removexp, leaderboard, rank, givexp, daily, weekly, coins, dice };
export default slash;
