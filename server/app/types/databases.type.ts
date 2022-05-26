/**
 * Databases Interfaces
 * =====================
 *
 * The God Bot
 *
 *
 * @license: MIT License
 *
 */

/**
 * Discord Settings Interface
 * =====================
 *
 * @Context: message.author.User
 *
 *
 * @param { Record<string, string | number | boolean> } id - Object with all the settings for the feature rank
 *
 */
export interface DiscordSettingsInterface {
	/**
	 * Discord Settings Interface
	 * =====================
	 *
	 *
	 * @param { Record<string, string | number | boolean> } id - Object with all the settings for the feature rank
	 *
	 */
	rank: DiscordSettingsRankInterface;
}

/**
 * Discord Settings Rank Interface
 * =====================
 *
 *
 *
 * @param { boolean } isGradient - if the background of the rank card is
 * @param { string } gradientColor1 - first color of gradiant background
 * @param { string } gradientColor2 - second color of gradiant background
 * @param {  number } levelMultiplier - the multiplier which scales the levelling
 * @param { number[] } xps - The list of alk xps for levels
 *
 */
export interface DiscordSettingsRankInterface {
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { boolean } isGradient - if the background of the rank card is
	 *
	 */
	isGradient: boolean;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } gradientColor1 - first color of gradiant background
	 *
	 */
	gradientColor1: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } gradientColor2 - second color of gradiant background
	 *
	 */
	gradientColor2: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param {  number } levelMultiplier - the multiplier which scales the levelling
	 *
	 */
	levelMultiplier: number;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { number[] } xps - The list of all xps for levels
	 *
	 */
	xps: number[];
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } color1 - main color theme
	 *
	 */
	color1: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } color2 - second color theme
	 *
	 */
	color2: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } color3 - third color theme
	 *
	 */
	color3: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } minPointsMessage - The minimum points awarded per message sent
	 *
	 */
	minPointsMessage: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } maxPointsMessage - The max points awarded per message sent
	 *
	 */
	maxPointsMessage: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } messagePointCooldown - The cooldown for getting points after a message
	 *
	 */
	messagePointCooldown: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } minPointsVoiceChannel - The minimum points awarded per minute in a voice channel
	 *
	 */
	minPointsVoiceChannel: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } maxPointsVoiceChannel - The max points awarded per minute in voice channel
	 *
	 */
	maxPointsVoiceChannel: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { boolean } displayLevelUpMessage - If the bot should display a message when the user levels up
	 *
	 */
	displayLevelUpMessage: boolean;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } levelUpMessage - The message to display when the user levels up
	 *
	 */
	levelUpMessage: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } levelUpChannelId - The channel id where the level up message should be displayed
	 *
	 */
	levelUpChannelId: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } afkChannelId - The channel id of the afk channel
	 *
	 */
	afkChannelId: string;
}

/**
 * Discord Rank Interface
 * =====================
 *
 * @Context: message.author.User
 *
 *
 * @param { string } id - discord id
 * @param { boolean } bot - is user a bot
 * @param { string } username - user username from discord
 * @param { string } avatar - avatar code from discord
 * @param { string } points - points of user
 * @param { number } messageAwarded - points awarded per message
 * @param { number } secondsInVoiceChanel - seconds in voice channel
 *
 */
export interface DiscordRankInterface {
	/**
	 * Discord Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } id - discord id
	 *
	 */
	id: string;
	/**
	 * Discord Rank Interface
	 * =====================
	 *
	 *
	 * @param { boolean } bot - is user a bot
	 *
	 */
	bot?: boolean;
	/**
	 * Discord Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } username - user username from discord
	 *
	 */
	username?: string;
	/**
	 * Discord Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } avatar - avatar code from discord
	 *
	 */
	avatar?: string;
	/**
	 * Discord Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } points - points of user
	 *
	 */
	points: string;
	/**
	 * Discord Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } messageAwarded - message that was awarded
	 *
	 */
	messageAwarded: number;
	/**
	 * Discord Rank Interface
	 * =====================
	 *
	 *
	 * @param { number } secondsInVoiceChat - seconds in voice channel
	 *
	 */
	secondsInVoiceChat: number;
}

/**
 * Discord User Interface
 * =====================
 *
 *
 *
 * @param { string } id - discord id
 * @param { string } username - user username from discord
 * @param { string } password - Password for the user
 * @param { string } role - The role of the user
 *
 */
export interface DiscordUsersInferface {
	/**
	 * Discord Users Interface
	 * =====================
	 *
	 *
	 * @param { string } id - user id
	 *
	 */
	id: string;
	/**
	 * Discord Users Interface
	 * =====================
	 *
	 *
	 * @param { string } username - user username
	 *
	 */
	username: string;
	/**
	 * Discord Users Interface
	 * =====================
	 *
	 *
	 * @param { string } password - user password
	 *
	 */
	password: string;
	/**
	 * Discord Users Interface
	 * =====================
	 *
	 *
	 * @param { string } role - The role of the user
	 *
	 */
	role: string;
}
