import bot from "@app/core/token";
import configs from "@app/configs/config";

const getGuild = async () => {
	return await bot.guilds.fetch(configs.discord.guild_id);
};

export { getGuild };
export default {
	getGuild,
};
