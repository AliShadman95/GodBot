import canvas, { registerFont } from "canvas"; // For canvas.
import { DiscordSettingsRankInterface } from "@app/types/databases.type";
registerFont("app/fonts/Inter-Medium.ttf", { family: "InterBold" });

interface userInfo {
	username: string;
	isGradient: boolean;
	gradientColor1: string;
	gradientColor2: string;
	discriminator: string;
	avatar: string;
	points: string;
	rank: number;
}

const generateBackground = (ctx, { isGradient, gradientColor1, gradientColor2 }: userInfo): void => {
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
	{ username, discriminator, xps, points, color1, color2, color3, rank }: userInfo & DiscordSettingsRankInterface,
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
	{ points, xps, color1, color2 }: userInfo & DiscordSettingsRankInterface,
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

const generateRankCard = async (userInfo: userInfo & DiscordSettingsRankInterface): Promise<Buffer> => {
	// Create canvas
	const c = canvas.createCanvas(1342, 400);
	const ctx = c.getContext("2d");

	const currentLevelIndex =
		userInfo?.xps?.findIndex(
			(xp, index) => parseInt(userInfo?.points) >= xp && parseInt(userInfo.points) < userInfo?.xps[index + 1],
		) + 1;

	generateBackground(ctx, userInfo);
	generateText(ctx, userInfo, currentLevelIndex);
	generateProgressBar(ctx, userInfo, currentLevelIndex);
	await generateAvatar(ctx, c, userInfo);

	const canvasData = await c.toBuffer("image/png");

	return canvasData;
};

export default generateRankCard;
export { generateRankCard };
