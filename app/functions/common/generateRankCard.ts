import canvas from "canvas"; // For canvas.
import fs from "fs"; // For creating files for our images.
import cwebp from "cwebp"; // For converting our images to webp.

// This functiona accepts 5 arguments:
// gradientColors: an array of two colors, i.e. [ '#ffffff', '#000000' ], used for our gradient
// articleName: the title of the article or site you want to appear in the image
// articleCategory: the category which that article sits in - or the subtext of the article
// emoji: the emoji you want to appear in the image.
const generateMainImage = async function (gradientColors, articleName, articleCategory, points) {
	articleCategory = articleCategory.toUpperCase();
	// gradientColors is an array [ c1, c2 ]
	if (typeof gradientColors === "undefined") {
		gradientColors = ["black", "black"];
		/* 	gradientColors = ["#8005fc", "#073bae"]; // Backup values */
	}

	// Create canvas
	const c = canvas.createCanvas(1342, 400);
	const ctx = c.getContext("2d");

	// Add gradient - we use createLinearGradient to do this
	const grd = ctx.createLinearGradient(0, 853, 1352, 0);
	grd.addColorStop(0, gradientColors[0]);
	grd.addColorStop(1, gradientColors[1]);
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

	const canvasData = await c.toBuffer("image/png");

	return canvasData;
};

const generateRankCard = async (points: string) => {
	return await generateMainImage(["black", "black"], "", "", points);
};

export default generateRankCard;
export { generateRankCard };
