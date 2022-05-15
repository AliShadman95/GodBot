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
	 * @param { number } minPointsMessage - The minimum points awarded per message sent
	 *
	 */
	minPointsMessage: number;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { number } maxPointsMessage - The max points awarded per message sent
	 *
	 */
	maxPointsMessage: number;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { number } messagePointCooldown - The cooldown for getting points after a message
	 *
	 */
	messagePointCooldown: number;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { number } minPointsVoiceChannel - The minimum points awarded per minute in a voice channel
	 *
	 */
	minPointsVoiceChannel: number;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { number } maxPointsVoiceChannel - The max points awarded per minute in voice channel
	 *
	 */
	maxPointsVoiceChannel: number;
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
 * @param { number } points - points of user
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
}
