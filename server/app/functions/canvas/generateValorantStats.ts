import Canvas from "@app/functions/canvas/canvas";
import { buildText } from "@app/functions/canvas/utils/buildText";
import { buildBackground } from "@app/functions/canvas/utils/buildBackground";
export const generateValorantStats = async function (data, modes) {
	const { canvas, ctx } = await buildBackground("template_valorant");

	const { name, tag } = data[0] || { name: "bax", tag: "126" };

	const totalKills = data.reduce((acc, curr) => acc + curr.stats.kills, 0);
	const totalDeaths = data.reduce((acc, curr) => acc + curr.stats.deaths, 0);
	const totalHeadshots = data.reduce((acc, curr) => acc + curr.stats.headshots, 0);
	const totalBodyShots = data.reduce((acc, curr) => acc + curr.stats.bodyshots, 0);
	const totalLegShots = data.reduce((acc, curr) => acc + curr.stats.legshots, 0);
	const totalDamageMade = data.reduce((acc, curr) => acc + curr.damage_made, 0);
	const totalDamageReceived = data.reduce((acc, curr) => acc + curr.damage_received, 0);
	const kd = Math.round((totalKills / totalDeaths) * 100) / 100;

	const headshotRatio = Math.round((totalHeadshots / (totalHeadshots + totalBodyShots + totalLegShots)) * 100);

	const textX = [500, 600, 870, 2285, 3000, 3150];
	const textY = [466, 822, 1170, 466, 820, 1171];
	const textValues = [
		totalKills,
		totalDeaths,
		`${headshotRatio}%`,
		kd,
		Math.round(totalDamageMade / 20),
		Math.round(totalDamageReceived / 20),
	];

	buildText({
		ctx,
		text: `${name}#${tag}`,
		size: 130,
		x: 1920,
		y: 160,
		color: "#ff4654",
		align: "center",
		rotate: null,
		font: null,
	});

	textX.forEach((x, index) => {
		buildText({
			ctx,
			text: textValues[index],
			size: 100,
			x: x,
			y: textY[index],
			color: "#ff4654",
			align: null,
			rotate: null,
			font: null,
		});
	});

	const mapsY = [1425, 1682.5, 1947.5];
	const modek = [1525.5, 1793, 2060];
	const modeimgk = [1480, 1745, 2013];
	const agentimgk = [1365, 1631.6, 1897];
	/* 	let keyk = 1425;
	 */
	const matches = data.slice(0, 3);

	for (let i = 0; i < matches.length; i++) {
		buildText({
			ctx,
			text: matches[i].map,
			size: 90,
			x: 855,
			y: mapsY[i],
			color: "white",
			align: "left",
			rotate: null,
			font: null,
		});
		buildText({
			ctx,
			text: matches[i].mode,
			size: 70,
			x: 855,
			y: modek[i],
			color: "white",
			align: "left",
			rotate: null,
			font: null,
		});

		const modeData = modes.find(
			(item) =>
				item.displayName.toLowerCase() ==
				(matches[i].mode == "Competitive" || matches[i].mode == "Unrated"
					? "Standard"
					: matches[i].mode
				).toLowerCase(),
		);

		if (modeData) {
			const mode_img = await Canvas.loadImage(modeData.displayIcon);
			ctx.drawImage(mode_img, 680, modeimgk[i], 100, 100);
		}

		if (matches[i]?.agent) {
			const agent_img = await Canvas.loadImage(matches[i].agent_image);
			ctx.drawImage(agent_img, 680, agentimgk[i], 100, 100);
		}

		buildText({
			ctx,
			text: matches[i].teams?.blue?.rounds_won,
			size: 90,
			x: 1875,
			y: modek[i] + 10,
			color: "#0088ff",
			align: "center",
			rotate: null,
			font: null,
		});
		buildText({
			ctx,
			text: ":",
			size: 90,
			x: 1940,
			y: modek[i] + 10,
			align: "center",
			color: "white",
			rotate: null,
			font: null,
		});
		buildText({
			ctx,
			text: matches[i].teams?.red?.rounds_won,
			size: 90,
			x: 2005,
			y: modek[i] + 10,
			color: "#ff4654",
			align: "center",
			rotate: null,
			font: null,
		});
		buildText({
			ctx,
			text: `${matches[i]?.stats?.kills}/${matches[i]?.stats?.deaths}/${matches[i]?.stats?.assists}`,
			size: 90,
			x: 2810,
			y: modek[i],
			align: "center",
			color: "white",
			rotate: null,
			font: null,
		});
	}

	const canvasData = await canvas.toBuffer("image/png");

	return canvasData;
};
