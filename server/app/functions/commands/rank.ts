import discord from "@routes/api/discord";
import db from "@routes/api/database";
import { generateRankCard } from "@app/functions/common/generateRankCard";

/**
 * command: !rank
 * =====================
 * Current rank of user or of specified user.
 *
 * @param ctx
 */
const rank = async (ctx): Promise<void> => {
	const selectedUser = ctx.options.getUser("utente") || ctx.user;

	if (selectedUser.bot) {
		discord.api.interactions.send(ctx, "Non puoi vedere il rank di un bot!", "");
		return;
	}

	let user = await db.rank.get({ id: selectedUser.id });

	if (user.id === "0") {
		await db.rank.add({
			...selectedUser,
			points: "0",
			messageAwarded: 0,
			secondsInVoiceChat: 0,
		});
		user = await db.rank.get({ id: selectedUser.id });
	}

	const settings = await db.settings.get({});
	const allUsers = await db.rank.getAll();

	const defaultCard = {
		isGradient: true,
		gradientColor1: "#6e00ff",
		gradientColor2: "#8e48c7",
		color1: "#ffffff",
		color2: "#000000",
		color3: "#02d032",
		idDiscord: "0",
		isImage: false,
		image: "",
		sx: 0,
		sy: 0,
		sWidth: 1920,
		sHeight: 1080,
		dx: 0,
		dy: 0,
		dWidth: 1342,
		dHeight: 853,
	};

	const userInfo = {
		username: selectedUser.username,
		discriminator: selectedUser.discriminator,
		avatar: selectedUser.displayAvatarURL({ format: "jpg" }) || "0",
		points: user?.points || "0",
		rank:
			allUsers
				.sort((a, b) => parseInt(b.points) - parseInt(a.points))
				.findIndex((u) => u.id === selectedUser.id) + 1,
	};

	const cardInfo =
		settings.rank.cards.find((card) => card.idDiscord === selectedUser.id) ||
		settings.rank.cards.find((card) => card.idDiscord === "0") ||
		defaultCard;

	const card = await generateRankCard(settings?.rank, cardInfo, userInfo);

	discord.api.interactions.send(ctx, "", card);
};

export { rank };
export default rank;
