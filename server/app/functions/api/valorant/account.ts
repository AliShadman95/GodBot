import axios from "axios";
import { logger } from "@app/functions/utils/logger";

const getAccount = async (name: string, tag: string): Promise<any> => {
	try {
		const response = await axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${name}/${tag}`, {
			headers: { Authorization: process.env.VALORANT_API },
		});
		return response.data;
	} catch (error) {
		logger.error(JSON.stringify(error || ""), "account.ts:getAccount()");
	}
};

const getPuuid = async (name: string, tag: string): Promise<any> => {
	const { data } = await getAccount(name, tag);

	return data?.puuid;
};

export { getPuuid };
export default { getPuuid };
