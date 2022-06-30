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
 * @param { Record<string, string | number | boolean> } rank - Object with all the settings for the feature rank
 * @param { Record<string, string | number | boolean> } economy - Object with all the settings for the feature economy
 *
 */
export interface DiscordSettingsInterface {
	/**
	 * Discord Settings Interface
	 * =====================
	 *
	 *
	 * @param { Record<string, string | number | boolean> } rank - Object with all the settings for the feature rank
	 *
	 */
	rank: DiscordSettingsRankInterface;
	/**
	 * Discord Settings Interface
	 * =====================
	 *
	 *
	 * @param { Record<string, string | number | boolean> } economy - Object with all the settings for the feature economy
	 *
	 */
	economy: DiscordSettingsEconomyInterface;
}

/**
 * Discord Settings Economy Interface
 * =====================
 *
 *
 *
 * @param {  string } coinName - Name of the coin
 * @param { string } dailyRewardMin - Minimum daily reward
 * @param { string } dailyMaxReward - Maximum daily reward
 * @param { string } weeklyRewardMin - Minimum weekly reward
 * @param { string } weeklyMaxReqrd - Maximum weekly reward
 * @param { string } showCoinsMessage - Message to send when the user wants to see his coins
 *
 */
export interface DiscordSettingsEconomyInterface {
	/**
	 * Discord Settings Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } coinName - Name of the coin
	 *
	 */
	coinName: string;
	/**
	 * Discord Settings Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } dailyRewardMin - Minimum daily reward
	 *
	 */
	dailyRewardMin: string;
	/**
	 * Discord Settings Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } dailyRewardMax - Maximum daily reward
	 *
	 */
	dailyRewardMax: string;
	/**
	 * Discord Settings Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } weeklyRewardMin - Minimum weekly reward
	 *
	 */
	weeklyRewardMin: string;
	/**
	 * Discord Settings Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } weeklyRewardMax - Maximum weekly reward
	 *
	 */
	weeklyRewardMax: string;
	/**
	 * Discord Settings Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } dailyRewardMessage - Message to send when the daily reward is given
	 *
	 */
	dailyRewardMessage: string;
	/**
	 * Discord Settings Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } weeklyRewardMessage - Message to send when the weekly reward is given
	 *
	 */
	weeklyRewardMessage: string;
	/**
	 * Discord Settings Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } showCoinsMessage - Message to send when the user wants to see his coins
	 *
	 */
	showCoinsMessage: string;
}

/**
 * Discord Settings Rank Interface
 * =====================
 *
 *
 *
 * @param {  number } levelMultiplier - the multiplier which scales the levelling
 * @param { number[] } xps - The list of alk xps for levels
 * @param { string } minPointsMessage - The minimum points awarded per message sent
 * @param { string } maxPointsMessage - The max points awarded per message sent
 * @param { string } messagePointCooldown - The cooldown for getting points after a message
 * @param { string } minPointsVoiceChannel - The minimum points awarded per minute in a voice channel
 * @param { string } maxPointsVoiceChannel - The max points awarded per minute in voice channel
 * @param { boolean } displayLevelUpMessage - If the bot should display a message when the user levels up
 * @param { string } levelUpMessage - The message to display when the user levels up
 * @param { string } levelUpChannelId - The channel id where the level up message should be displayed
 * @param { string } afkChannelId - The channel id of the afk channel
 * @param { string } giveXpMessage - The message to display when the user use the givexp command
 * @param { string } removeXpMessage - The message to display when the user use the removexp command
 * @param { string[] } giveXpEnabledRoles - The list of roles that can use the givexp command
 * @param { string[] } removeXpEnabledRoles - The list of roles that can use the removexp command
 * @param { DiscordCardInferface[] } cards - The list of cards
 *
 */
export interface DiscordSettingsRankInterface {
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param {  DiscordCardInferface[] } cards - The list of cards
	 *
	 */
	cards: DiscordCardInferface[];
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
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } giveXpMessage - The message to display when the user use the givexp command
	 *
	 */
	giveXpMessage: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } removeXpMessage - The message to display when the user use the removexp command
	 *
	 */
	removeXpMessage: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string[] } giveXpEnabledRoles - The list of roles that can use the givexp command
	 *
	 */
	giveXpEnabledRoles: string[];
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string[] } removeXpEnabledRoles - The list of roles that can use the removexp command
	 *
	 */
	removeXpEnabledRoles: string[];
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } botInfoChannelId - The channel id of the bot info channel
	 *
	 */
	botInfoChannelId: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } botRestartMessage - The message to display when the bot is restarted
	 *
	 */
	botRestartMessage: string;
	/**
	 * Discord Settings Rank Interface
	 * =====================
	 *
	 *
	 * @param { boolean } displayRestartMessage - If the bot should display a message when the bot is restarted
	 *
	 */
	displayRestartMessage: string;
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
 * @param { string } discriminator - user discriminator from discord
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
	/**
	 * Discord Rank Interface
	 * =====================
	 *
	 *
	 * @param { string } discriminator - user discriminator from discord
	 *
	 */
	discriminator: string;
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
	/**
	 * Discord Users Interface
	 * =====================
	 *
	 *
	 * @param { string } idDiscord - user id discord
	 *
	 */
	idDiscord: string;
}

export interface DiscordCardInferface {
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { string } idDiscord - user id discord
	 *
	 */
	idDiscord: string;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { boolean } isGradient - if the background of the rank card is
	 *
	 */
	isGradient: boolean;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { string } gradientColor1 - first color of gradiant background
	 *
	 */
	gradientColor1: string;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { string } gradientColor2 - second color of gradiant background
	 *
	 */
	gradientColor2: string;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { string } color1 - main color theme
	 *
	 */
	color1: string;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { string } color2 - second color theme
	 *
	 */
	color2: string;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { string } color3 - third color theme
	 *
	 */
	color3: string;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { boolean } isImage - if the background of the rank card is a image
	 *
	 */
	isImage: boolean;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { string } image - URL of the image
	 *
	 */
	image: string;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { number } sx - x position of the image
	 *
	 */
	sx: number;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { number } sy - y position of the image
	 *
	 */
	sy: number;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { number } sWidth - width of the image
	 *
	 */
	sWidth: number;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { number } sHeight - height of the image
	 *
	 */
	sHeight: number;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { number } dx - x position of the container
	 *
	 */
	dx: number;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { number } dy - y position of the container
	 *
	 */
	dy: number;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { number } dWidth - width of the container
	 *
	 */
	dWidth: number;
	/**
	 * Discord Card Interface
	 * =====================
	 *
	 *
	 * @param { number } dHeight - height of the container
	 *
	 */
	dHeight: number;
}

/**
 * Discord Voice Channel Interface
 * =====================
 *
 *
 *
 * @param { string } id - discord id
 * @param { number } joinTime - time when user joined voice channel
 *
 */
export interface DiscordVoiceChannelInterface {
	/**
	 * Discord Voice Channel Interface
	 * =====================
	 *
	 *
	 * @param { string } id - user id
	 *
	 */
	id: string;
	/**
	 * Discord Voice Channel Interface
	 * =====================
	 *
	 *
	 * @param { string } username -  username
	 *
	 */
	username: string;
	/**
	 * Discord Voice Channel Interface
	 * =====================
	 *
	 *
	 * @param { number } joinTime - time when user joined voice channel
	 *
	 */
	joinTime: number;
}

/**
 * Discord Economy Interface
 * =====================
 *
 * @Context: message.author.User
 *
 *
 * @param { string } id - discord id
 * @param { boolean } bot - is user a bot
 * @param { string } username - user username from discord
 * @param { string } avatar - avatar code from discord
 * @param { string } coins - coins of user
 * @param { number } lastDailyReward - time when user last received daily reward
 * @param { number } lastWeeklyReward - time when user last received weekly reward
 * @param { string } discriminator - user discriminator from discord
 *
 */
export interface DiscordEconomyInterface {
	/**
	 * Discord Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } id - discord id
	 *
	 */
	id: string;
	/**
	 * Discord Economy Interface
	 * =====================
	 *
	 *
	 * @param { boolean } bot - is user a bot
	 *
	 */
	bot?: boolean;
	/**
	 * Discord Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } username - user username from discord
	 *
	 */
	username?: string;
	/**
	 * Discord Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } avatar - avatar code from discord
	 *
	 */
	avatar?: string;
	/**
	 * Discord Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } coins - coins of user
	 *
	 */
	coins: string;
	/**
	 * Discord Economy Interface
	 * =====================
	 *
	 *
	 * @param { number } lastDailyReward - time when user last received daily reward
	 *
	 */
	lastDailyReward: number;
	/**
	 * Discord Economy Interface
	 * =====================
	 *
	 *
	 * @param { number } lastWeeklyReward - time when user last received weekly reward
	 *
	 */
	lastWeeklyReward: number;
	/**
	 * Discord Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } discriminator - user discriminator from discord
	 *
	 */
	discriminator: string;
}
/**
 * Discord Games Interface
 * =====================
 *
 * @Context: message.author.User
 *
 *
 * @param { string } guess - guess
 *
 */
export interface DiscordGamesInterface {
	/**
	 * Discord Economy Interface
	 * =====================
	 *
	 *
	 * @param { string } guess - guess game info
	 *
	 */
	guess: DiscordGuessInterface[];
}
/**
 * Discord Guess Interface
 * =====================
 *
 * @Context: message.author.User
 *
 *
 * @param { string } userId - id of user playing game
 * @param { string } numberToGuess - number to guess
 *
 */
export interface DiscordGuessInterface {
	/**
	 * Discord Guess Interface
	 * =====================
	 *
	 *
	 * @param { string } userId - id of user playing game
	 *
	 */
	userId: string;
	/**
	 * Discord Guess Interface
	 * =====================
	 *
	 *
	 * @param { string } username - username of the user playing game
	 *
	 */
	username: string;
	/**
	 * Discord Guess Interface
	 * =====================
	 *
	 *
	 * @param { string } numberToGuess - number to guess
	 *
	 */
	numberToGuess: string;
	/**
	 * Discord Guess Interface
	 * =====================
	 *
	 *
	 * @param { string } coinsPlayed - amount of coins user played
	 *
	 */
	coinsPlayed: string;
	/**
	 * Discord Guess Interface
	 * =====================
	 *
	 *
	 * @param { number } attempts - amount of attempts user made
	 *
	 */
	attempts: number;
}
