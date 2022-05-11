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
 * Discord Rank Interface
 * =====================
 *
 * @Context: message.author.User
 *
 *
 * @param { number } id - discord id
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
	points?: string;
}
