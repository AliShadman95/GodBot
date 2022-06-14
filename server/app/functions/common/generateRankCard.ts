import canvas, { registerFont } from "canvas"; // For canvas.
import { DiscordSettingsRankInterface, DiscordCardInferface } from "@app/types/databases.type";
import { logger } from "@configs/config";
registerFont("app/fonts/Inter-Regular.ttf", { family: "InterBold" });

interface userInfo {
	username: string;
	discriminator: string;
	avatar: string;
	points: string;
	rank: number;
}

const generateBackground = async (
	ctx,
	{ isGradient, gradientColor1, gradientColor2, isImage, image }: DiscordCardInferface,
): Promise<void> => {
	if (isImage && image !== "") {
		try {
			const a = await canvas.loadImage(image);
			if (!a) {
				return;
			}
			ctx.drawImage(a, 0, 0, 1342, 853);
		} catch (error) {
			console.log(error);
		}
		return;
	}
	// Add gradient - we use createLinearGradient to do this

	const grd = ctx.createLinearGradient(0, 853, 1352, 0);
	grd.addColorStop(0, gradientColor1);
	isGradient && grd.addColorStop(1, gradientColor2 || "#0a0a0a");
	ctx.fillStyle = grd;
	// Fill our gradient
	ctx.fillRect(0, 0, 1342, 853);
};

const generateText = (
	ctx,
	{ xps }: DiscordSettingsRankInterface,
	{ username, discriminator, points, rank }: userInfo,
	{ color1, color2, color3 }: DiscordCardInferface,
	currentLevelIndex: number,
): void => {
	// Add our title text
	ctx.font = "70px InterBold";
	ctx.fillStyle = color1;

	const numberLevelWidth = ctx.measureText(currentLevelIndex).width;

	ctx.fillText(currentLevelIndex, 1270 - numberLevelWidth, 110);

	// Add our title text
	ctx.font = "40px InterBold";
	ctx.fillStyle = color1;

	const levelLabelWidth = ctx.measureText("LEVEL").width;

	ctx.fillText("LEVEL", 1270 - numberLevelWidth - levelLabelWidth - 10, 110);

	// Add our title text
	ctx.font = "70px InterBold";
	ctx.fillStyle = color2;

	const numberRankWidth = ctx.measureText(`#${rank}`).width;

	ctx.fillText(`#${rank}`, 1270 - numberLevelWidth - levelLabelWidth - numberRankWidth - 40, 110);

	// Add our title text
	ctx.font = "40px InterBold";
	ctx.fillStyle = color2;

	const rankLabelWidth = ctx.measureText("RANK").width;

	ctx.fillText("RANK", 1270 - numberLevelWidth - levelLabelWidth - numberRankWidth - rankLabelWidth - 60, 110);

	// /////////// /////////

	// Add our title text
	ctx.font = "58px InterBold";
	ctx.fillStyle = color2;
	ctx.fillText(username, 385, 250);

	const usernameWidth = ctx.measureText(username).width;

	ctx.font = "38px InterBold";
	ctx.fillStyle = color3;

	ctx.fillText(`#${discriminator}`, 385 + usernameWidth + 12, 250);

	// Xp To New Level
	ctx.font = "38px InterBold";
	ctx.fillStyle = color3;

	const xpNeededWidth = ctx.measureText(`/ ${xps[currentLevelIndex]} XP`).width;

	ctx.fillText(`/ ${xps[currentLevelIndex]} XP`, 1260 - xpNeededWidth, 250);

	ctx.font = "38px InterBold";
	ctx.fillStyle = color2;

	const currentXpWidth = ctx.measureText(points).width;

	ctx.fillText(points, 1260 - xpNeededWidth - currentXpWidth - 20, 250);
};

const generateProgressBar = (
	ctx,
	{ xps }: DiscordSettingsRankInterface,
	{ points }: userInfo,
	{ color1, color2 }: DiscordCardInferface,
	currentLevelIndex: number,
): void => {
	const percentage = Math.floor(
		(parseInt(points) - (xps[currentLevelIndex - 1] || 0)) /
			((xps[currentLevelIndex] - (xps[currentLevelIndex - 1] || 0)) / 100),
	);

	// Background level bar
	for (let i = 0; i < 100; i++) {
		ctx.beginPath();
		ctx.lineWidth = 42;
		ctx.strokeStyle = color2;
		ctx.fillStyle = color2;
		ctx.arc(400 + i * 8.65, 300, 8, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.fill();
	}
	// Progress bar
	for (let i = 0; i < percentage; i++) {
		ctx.beginPath();
		ctx.lineWidth = 42;
		ctx.strokeStyle = color1;
		ctx.fillStyle = color1;
		ctx.arc(400 + i * 8.65, 300, 8, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.fill();
	}
};

const generateAvatar = async (ctx, c, { avatar }: userInfo): Promise<void> => {
	const circle = {
		x: c.width / 7,
		y: c.height / 2,
		radius: 140,
	};

	ctx.beginPath();
	ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const a = await canvas.loadImage(avatar);

	// Compute aspectration
	const aspect = a.height / a.width;
	// Math.max is ued to have cover effect use Math.min for contain
	const hsx = circle.radius * Math.max(1.0 / aspect, 1.0);
	const hsy = circle.radius * Math.max(aspect, 1.0);
	// x - hsl and y - hsy centers the image
	ctx.drawImage(a, circle.x - hsx, circle.y - hsy, hsx * 2, hsy * 2);
};

const generateRankCard = async (
	settings: DiscordSettingsRankInterface,
	card: DiscordCardInferface,
	userInfo: userInfo,
): Promise<Buffer> => {
	// Create canvas
	const c = canvas.createCanvas(1342, 400);
	const ctx = c.getContext("2d");

	const currentLevelIndex =
		settings?.xps?.findIndex(
			(xp, index) => parseInt(userInfo?.points) >= xp && parseInt(userInfo.points) < settings?.xps[index + 1],
		) + 1;

	await generateBackground(ctx, card);
	generateText(ctx, settings, userInfo, card, currentLevelIndex);
	generateProgressBar(ctx, settings, userInfo, card, currentLevelIndex);
	await generateAvatar(ctx, c, userInfo);

	const canvasData = await c.toBuffer("image/png");

	return canvasData;
};

export default generateRankCard;
export { generateRankCard };
