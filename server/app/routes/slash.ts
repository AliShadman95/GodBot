import givexp from "@app/functions/slash/givexp";
import help from "@app/functions/slash/help";
import info from "@app/functions/slash/info";
import leaderboard from "@app/functions/slash/leaderboard";
import rank from "@app/functions/slash/rank";
import removexp from "@app/functions/slash/removexp";
import version from "@app/functions/slash/version";
import valorantInfo from "@app/functions/slash/valorantInfo";
import daily from "@app/functions/slash/daily";
import weekly from "@app/functions/slash/weekly";
import coins from "@app/functions/slash/coins";
import dice from "@app/functions/slash/dice";
import guess from "@app/functions/slash/guess";
import work from "@app/functions/slash/work";

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
	guess,
	work,
	valorantInfo,
};

export {
	info,
	help,
	version,
	removexp,
	leaderboard,
	rank,
	givexp,
	daily,
	weekly,
	coins,
	dice,
	guess,
	work,
	valorantInfo,
};
export default slash;
