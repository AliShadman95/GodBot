import Canvas from "@app/functions/canvas/canvas";

export const buildBackground = async function (fileName) {
	const canvas = Canvas.createCanvas(3840, 2160);
	const ctx = canvas.getContext("2d");
	const background = await Canvas.loadImage(`app/assets/${fileName}.png`);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	return canvas;
};
