import canvas from "canvas"; // For canvas.

interface userInfo {
	username: string;
	isGradient: boolean;
	gradientColor1: string;
	gradientColor2: string;
	discriminator: string;
	avatar: string;
	points: string;
}

const generateBackground = (ctx, { isGradient, gradientColor1, gradientColor2 }: userInfo) => {
	// Add gradient - we use createLinearGradient to do this
	const grd = ctx.createLinearGradient(0, 853, 1352, 0);
	grd.addColorStop(0, isGradient ? gradientColor1 : "#0a0a0a");
	isGradient && grd.addColorStop(1, gradientColor2 || "#0a0a0a");
	ctx.fillStyle = grd;
	// Fill our gradient
	ctx.fillRect(0, 0, 1342, 853);
};

const generateText = (ctx, { username, discriminator, gradientColor2 }: userInfo) => {
	// Add our title text
	ctx.font = "70px InterBold";
	ctx.fillStyle = "cyan";

	const numberLevelWidth = ctx.measureText("1000").width;

	ctx.fillText("1000", 1270 - numberLevelWidth, 110);

	// Add our title text
	ctx.font = "40px InterBold";
	ctx.fillStyle = "cyan";

	const levelLabelWidth = ctx.measureText("LEVEL").width;

	ctx.fillText("LEVEL", 1270 - numberLevelWidth - levelLabelWidth - 20, 110);

	// Add our title text
	ctx.font = "70px InterBold";
	ctx.fillStyle = "white";

	const numberRankWidth = ctx.measureText("#1").width;

	ctx.fillText("#1", 1270 - numberLevelWidth - levelLabelWidth - numberRankWidth - 40, 110);

	// Add our title text
	ctx.font = "40px InterBold";
	ctx.fillStyle = "white";

	const rankLabelWidth = ctx.measureText("RANK").width;

	ctx.fillText("RANK", 1270 - numberLevelWidth - levelLabelWidth - numberRankWidth - rankLabelWidth - 60, 110);

	// /////////// /////////

	// Add our title text
	ctx.font = "58px InterBold";
	ctx.fillStyle = "white";
	ctx.fillText(username, 385, 250);

	const usernameWidth = ctx.measureText(username).width;

	ctx.font = "38px InterBold";
	ctx.fillStyle = "grey";

	ctx.fillText(`#${discriminator}`, 385 + usernameWidth + 12, 250);

	// Xp To New Level
	ctx.font = "38px InterBold";
	ctx.fillStyle = "grey";

	const xpNeededWidth = ctx.measureText("/ 10000 XP").width;

	ctx.fillText(`/ 10000 XP`, 1260 - xpNeededWidth, 250);

	ctx.font = "38px InterBold";
	ctx.fillStyle = "white";

	const currentXpWidth = ctx.measureText("1000").width;

	ctx.fillText("1000", 1260 - xpNeededWidth - currentXpWidth - 20, 250);
};

const generateProgressBar = (ctx) => {
	// Background level bar
	for (let i = 0; i < 100; i++) {
		ctx.beginPath();
		ctx.lineWidth = 42;
		ctx.strokeStyle = "white";
		ctx.fillStyle = "white";
		ctx.arc(400 + i * 8.65, 300, 8, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.fill();
	}
	// Progress bar
	for (let i = 0; i < 80; i++) {
		ctx.beginPath();
		ctx.lineWidth = 42;
		ctx.strokeStyle = "cyan";
		ctx.fillStyle = "cyan";
		ctx.arc(400 + i * 8.65, 300, 8, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.fill();
	}
};

const generateAvatar = async (ctx, c, { avatar }: userInfo) => {
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

const generateRankCard = async (userInfo: userInfo) => {
	// Create canvas
	const c = canvas.createCanvas(1342, 400);
	const ctx = c.getContext("2d");

	generateBackground(ctx, userInfo);
	generateText(ctx, userInfo);
	generateProgressBar(ctx);
	await generateAvatar(ctx, c, userInfo);

	const canvasData = await c.toBuffer("image/png");

	return canvasData;
};

export default generateRankCard;
export { generateRankCard };
