import axios from "axios";
import { logger } from "@app/functions/utils/logger";

const getModes = async () => {
	try {
		const modes = await axios.get("https://valorant-api.com/v1/gamemodes");

		return modes?.data?.data || null;
	} catch (error) {
		logger.error(JSON.stringify(error || ""), "assets.ts:getModes()");
	}
};

export { getModes };
export default { getModes };
