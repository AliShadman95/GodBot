import canvas from "canvas"; // For canvas.
import fs from "fs"; // For creating files for our images.
import cwebp from "cwebp"; // For converting our images to webp.
import nodeHtmlToImage from "node-html-to-image";

interface userInfo {
	username: string;
	isGradient: boolean;
	gradientColor1: string;
	gradientColor2: string;
	discriminator: string;
	avatar: string;
	points: string;
}

// This functiona accepts 5 arguments:
// gradientColors: an array of two colors, i.e. [ '#ffffff', '#000000' ], used for our gradient
// articleName: the title of the article or site you want to appear in the image
// articleCategory: the category which that article sits in - or the subtext of the article
// emoji: the emoji you want to appear in the image.
const generateRankCard = async ({ isGradient, gradientColor1, gradientColor2, avatar }: userInfo) => {
	// gradientColors is an array [ c1, c2 ]
	/* if (typeof gradientColors === "undefined") {
		gradientColors = ["black", "black"];
		gradientColors = ["#8005fc", "#073bae"]; // Backup values
	}s
 */
	// Create canvas
	const c = canvas.createCanvas(1342, 400);
	const ctx = c.getContext("2d");

	// Add gradient - we use createLinearGradient to do this
	const grd = ctx.createLinearGradient(0, 853, 1352, 0);
	grd.addColorStop(0, isGradient ? gradientColor1 : "red");
	isGradient && grd.addColorStop(1, gradientColor2 || "red");
	ctx.fillStyle = grd;
	// Fill our gradient
	ctx.fillRect(0, 0, 1342, 853);

	// Add our title text
	ctx.font = "40px InterBold";
	ctx.fillStyle = "white";
	ctx.fillText("RANK", 900, 110);

	// Add our title text
	ctx.font = "70px InterBold";
	ctx.fillStyle = "white";

	ctx.fillText("#1", 1020, 110);

	// Add our title text
	ctx.font = "40px InterBold";
	ctx.fillStyle = "cyan";

	ctx.fillText("LEVEL", 1120, 110);

	// Add our title text
	ctx.font = "70px InterBold";
	ctx.fillStyle = "cyan";

	ctx.fillText("2", 1255, 110);

	console.log(avatar);

	const a = await canvas.loadImage(avatar);

	ctx.beginPath();
	ctx.arc(55, 95, 30, 0, 2 * Math.PI);
	ctx.clip();
	ctx.stroke();

	ctx.drawImage(a, 50, 130, 200, 200);

	// Progress bar
	/* 	for (let i = 0; i < 60; i++) {
		ctx.beginPath();
		ctx.lineWidth = 14;
		ctx.strokeStyle = "white";
		ctx.fillStyle = "white";
		ctx.arc(203 + i * 4.32, 190, 8, 0, Math.PI * 2, true);
		ctx.stroke();
		ctx.fill();
	} */

	const canvasData = await c.toBuffer("image/png");

	return canvasData;
};

export default generateRankCard;
export { generateRankCard };
