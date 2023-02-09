// Level Generator
/* const d: number[] = [];

	for (let i = 1; i < 1001; i++) {
		const multiplier = Math.ceil(i * (i * 15));
		d.push(100 * i + (i === 1 ? 0 : multiplier));
	}
 */

const gamemodes = [
	{
		name: "Escalation",
		path: "escalation.png",
		emoji: {
			name: "escalation",
			id: "958441833627787350",
			animated: false,
		},
	},
	{
		name: "Swiftplay",
		path: "swiftplay.png",
		emoji: {
			name: "swiftplay",
			id: "1049838296194359297",
			animated: false,
		},
	},
	{
		name: "Spike Rush",
		path: "spikerush.png",
		emoji: {
			name: "spikerush",
			id: "958441833627779202",
			animated: false,
		},
	},
	{
		name: "Deathmatch",
		path: "deathmatch.png",
		emoji: {
			name: "deathmatch",
			id: "958441493612355704",
			animated: false,
		},
	},
	{
		name: "Competitive",
		path: "competitive.png",
		emoji: {
			name: "unrated",
			id: "958441359126167613",
			animated: false,
		},
	},
	{
		name: "Unrated",
		path: "unrated.png",
		emoji: {
			name: "unrated",
			id: "958441359126167613",
			animated: false,
		},
	},
	{
		name: "Replication",
		path: "replication.png",
		emoji: {
			name: "replication",
			id: "958441833636192386",
			animated: false,
		},
	},
	{
		name: "Custom Game",
		path: "unrated.png",
		emoji: {
			name: "unrated",
			id: "958441359126167613",
			animated: false,
		},
	},
	{
		name: "New Map",
		path: "unrated.png",
		emoji: {
			name: "unrated",
			id: "958441359126167613",
			animated: false,
		},
	},
	{
		name: "Snowball Fight",
		path: "snowball.png",
		emoji: {
			name: "snowball",
			id: "958441833661358131",
			animated: false,
		},
	},
];
/* export const maps = {
	"/Game/Maps/Triad/Triad": "Haven",
	"/Game/Maps/Port/Port": "Icebox",
	"/Game/Maps/Duality/Duality": "Bind",
	"/Game/Maps/Bonsai/Bonsai": "Split",
	"/Game/Maps/Ascent/Ascent": "Ascent",
	"/Game/Maps/Foxtrot/Foxtrot": "Breeze",
	"/Game/Maps/Canyon/Canyon": "Fracture",
	"/Game/Maps/Pitt/Pitt": "Pearl",
	"/Game/Maps/Jam/Jam": "Lotus",
}; */
/* export const ranks = {
	0: {
		mmr: "assets/background/VALORANT_mmr.png",
		color: "#c5c5c5",
		discordid: "<:unrated:862004031248924693>",
		graydiscordid: "<:unrated_gray:1060515638105358346>",
	},
	1: {
		mmr: "assets/background/VALORANT_mmr.png",
		color: "#c5c5c5",
		discordid: "<:unrated:862004031248924693>",
		graydiscordid: "<:unrated_gray:1060515638105358346>",
	},
	2: {
		mmr: "assets/background/VALORANT_mmr.png",
		color: "#c5c5c5",
		discordid: "<:unrated:862004031248924693>",
		graydiscordid: "<:unrated_gray:1060515638105358346>",
	},
	3: {
		mmr: "assets/background/VALORANT_mmr_iron.png",
		color: "#5a5959",
		discordid: "<:iron1:862004162098102272>",
		graydiscordid: "<:iron_gray:1060515649329315930>",
	},
	4: {
		mmr: "assets/background/VALORANT_mmr_iron.png",
		color: "#5a5959",
		discordid: "<:iron2:862004185036488715>",
		graydiscordid: "<:iron_gray:1060515649329315930>",
	},
	5: {
		mmr: "assets/background/VALORANT_mmr_iron.png",
		color: "#5a5959",
		discordid: "<:iron3:862004206718025738>",
		graydiscordid: "<:iron_gray:1060515649329315930>",
	},
	6: {
		mmr: "assets/background/VALORANT_mmr_bronze.png",
		color: "#924e30",
		discordid: "<:bronze1:862004343054008331>",
		graydiscordid: "<:bronze_gray:1060515640907145316>",
	},
	7: {
		mmr: "assets/background/VALORANT_mmr_bronze.png",
		color: "#924e30",
		discordid: "<:bronze2:862004376272109608>",
		graydiscordid: "<:bronze_gray:1060515640907145316>",
	},
	8: {
		mmr: "assets/background/VALORANT_mmr_bronze.png",
		color: "#924e30",
		discordid: "<:bronze3:862004410775371777>",
		graydiscordid: "<:bronze_gray:1060515640907145316>",
	},
	9: {
		mmr: "assets/background/VALORANT_mmr_silver.png",
		color: "#c5c4c4",
		discordid: "<:silver1:862004807896268832>",
		graydiscordid: "<:silver_gray:1060515635941089340>",
	},
	10: {
		mmr: "assets/background/VALORANT_mmr_silver.png",
		color: "#c5c4c4",
		discordid: "<:silver2:862004860655501342>",
		graydiscordid: "<:silver_gray:1060515635941089340>",
	},
	11: {
		mmr: "assets/background/VALORANT_mmr_silver.png",
		color: "#c5c4c4",
		discordid: "<:silver3:862004895708086302>",
		graydiscordid: "<:silver_gray:1060515635941089340>",
	},
	12: {
		mmr: "assets/background/VALORANT_mmr_gold.png",
		color: "#dbb815",
		discordid: "<:gold1:862004921763364874>",
		graydiscordid: "<:gold_gray:1060515645227278427>",
	},
	13: {
		mmr: "assets/background/VALORANT_mmr_gold.png",
		color: "#dbb815",
		discordid: "<:gold2:862004943708094525>",
		graydiscordid: "<:gold_gray:1060515645227278427>",
	},
	14: {
		mmr: "assets/background/VALORANT_mmr_gold.png",
		color: "#dbb815",
		discordid: "<:gold3:862004966636781608>",
		graydiscordid: "<:gold_gray:1060515645227278427>",
	},
	15: {
		mmr: "assets/background/VALORANT_mmr_platinum.png",
		color: "#38abc2",
		discordid: "<:plat1:862005172687470622>",
		graydiscordid: "<:platinum_gray:1060515650746982450>",
	},
	16: {
		mmr: "assets/background/VALORANT_mmr_platinum.png",
		color: "#38abc2",
		discordid: "<:plat2:862005201301143573>",
		graydiscordid: "<:platinum_gray:1060515650746982450>",
	},
	17: {
		mmr: "assets/background/VALORANT_mmr_platinum.png",
		color: "#38abc2",
		discordid: "<:plat3:862005224645853185>",
		graydiscordid: "<:platinum_gray:1060515650746982450>",
	},
	18: {
		mmr: "assets/background/VALORANT_mmr_diamond.png",
		color: "#bb77f0",
		discordid: "<:dia1:862005255628652554>",
		graydiscordid: "<:diamond_gray:1060515643876704256>",
	},
	19: {
		mmr: "assets/background/VALORANT_mmr_diamond.png",
		color: "#bb77f0",
		discordid: "<:dia2:862005278207508551>",
		graydiscordid: "<:diamond_gray:1060515643876704256>",
	},
	20: {
		mmr: "assets/background/VALORANT_mmr_diamond.png",
		color: "#bb77f0",
		discordid: "<:dia3:862005298193891378>",
		graydiscordid: "<:diamond_gray:1060515643876704256>",
	},
	21: {
		mmr: "assets/background/VALORANT_mmr_ascendant.png",
		color: "#6ae2af",
		discordid: "<:ascendant1:987519801868025886>",
		graydiscordid: "<:ascendant_gray:1060515639233609758>",
	},
	22: {
		mmr: "assets/background/VALORANT_mmr_ascendant.png",
		color: "#6ae2af",
		discordid: "<:ascendant2:987519799590522920>",
		graydiscordid: "<:ascendant_gray:1060515639233609758>",
	},
	23: {
		mmr: "assets/background/VALORANT_mmr_ascendant.png",
		color: "#6ae2af",
		discordid: "<:ascendant3:987519800521662525>",
		graydiscordid: "<:ascendant_gray:1060515639233609758>",
	},
	24: {
		mmr: "assets/background/VALORANT_mmr_immortal.png",
		color: "#da3f76",
		discordid: "<:immortal1:862005437264429056>",
		graydiscordid: "<:immortal_gray:1060515647882272768>",
	},
	25: {
		mmr: "assets/background/VALORANT_mmr_immortal.png",
		color: "#da3f76",
		discordid: "<:immortal2:862005462580985856>",
		graydiscordid: "<:immortal_gray:1060515647882272768>",
	},
	26: {
		mmr: "assets/background/VALORANT_mmr_immortal.png",
		color: "#da3f76",
		discordid: "<:immortal3:862005493840478208>",
		graydiscordid: "<:immortal_gray:1060515647882272768>",
	},
	27: {
		mmr: "assets/background/VALORANT_mmr_radiant.png",
		color: "#d3d058",
		discordid: "<:radiant:862005538392506408>",
		graydiscordid: "<:radiant_gray:1060515652986744862>",
	},
};
 */

export { gamemodes };
export default gamemodes;
