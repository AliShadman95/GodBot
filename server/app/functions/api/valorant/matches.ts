import axios from "axios";
import valorant from "@app/routes/api/valorant";
import { logger } from "@app/functions/utils/logger";

const getRawData = async (type: string, puuid: string, queries: string): Promise<any> => {
	try {
		const { data } = await axios.post(
			`https://api.henrikdev.xyz/valorant/v1/raw`,
			{
				type: type,
				region: "eu",
				value: puuid,
				queries: `?${queries}`,
			},
			{
				headers: { Authorization: process.env.VALORANT_API },
			},
		);
		return data;
	} catch (error) {
		logger.error(JSON.stringify(error || ""), "matches.ts:getRawData()");
	}
};

const getLastTwentyMatchesIds = async (name: string, tag: string, puuid: string): Promise<any> => {
	const data = await getRawData("matchhistory", puuid, "endIndex=19");

	return data?.History?.map((d) => d.MatchID) || null;
};

const getSingleMatchDetails = async (matchId: string): Promise<any> => {
	try {
		const { data } = await axios.get(`https://api.henrikdev.xyz/valorant/v2/match/${matchId}`, {
			headers: { Authorization: process.env.VALORANT_API },
		});
		return data?.data;
	} catch (error) {
		logger.error(JSON.stringify(error || ""), "matches.ts:getSingleMatchDetails()");
	}
};

const getStats = async (name: string, tag: string): Promise<any> => {
	const puuid = await valorant.api.account.getPuuid(name, tag);

	const matchesIds = await getLastTwentyMatchesIds(name, tag, puuid);

	if (!matchesIds || !puuid) {
		return null;
	}

	const promises: Promise<any>[] = [];

	for (const matchId of matchesIds) {
		promises.push(getSingleMatchDetails(matchId));
	}

	const matchesData = await Promise.all(promises);

	if (!matchesData || matchesData?.some((m) => !m)) {
		return null;
	}

	const stats = matchesData?.map((match) => {
		const player = match.players?.all_players?.find((p) => p.puuid === puuid);

		return {
			stats: player?.stats,
			teams: match.teams,
			map: match.metadata.map,
			mode: match.metadata.mode,
			damage_made: player?.damage_made,
			damage_received: player?.damage_received,
			name: player?.name,
			agent: player?.character,
			agent_image: player?.assets?.agent?.small,
			tag: player?.tag,
		};
	});

	return stats;
};

export { getStats };
export default { getStats };
