import express from "express";
import bot from "@app/core/token";
const router = express.Router();
import db from "@routes/api/database";
import { DiscordSettingsInterface } from "@app/types/databases.type";
import discord from "@routes/api/discord";
import logger from "@app/functions/utils/logger";
import imgbbUploader from "imgbb-uploader";

// middleware that is specific to this router
router.use(function timeLog(req: express.Request, res: express.Response, next): void {
	logger.info(`Time: ${Date.now()}`, "settings.ts:timeLog()");
	next();
});
// define the home page route
router.get("/", async function (req: express.Request, res: express.Response): Promise<void> {
	const settings = await db.settings.get({});
	res.json(settings);
});

router.put("/", async function (req: express.Request, res: express.Response): Promise<void> {
	try {
		const settings = req.body as DiscordSettingsInterface;
		await db.settings.update({}, settings);

		const newData = await db.settings.get({});

		res.json(newData || "Errore nella modifica dei settaggi");
	} catch {
		res.send("Errore nella modifica dei settaggi");
	}
});

router.get("/voiceChannels", async function (req: express.Request, res: express.Response): Promise<void> {
	const channels = bot.channels?.cache
		?.filter((c) => c.type === "GUILD_VOICE" && c.guildId === process.env.GUILD_ID)
		.map((channel) => {
			if (channel.type === "GUILD_VOICE") {
				return { id: channel.id, name: channel.name };
			}
		});

	res.json(channels);
});

router.get("/textChannels", async function (req: express.Request, res: express.Response): Promise<void> {
	const channels = bot.channels?.cache
		?.filter((c) => c.type === "GUILD_TEXT" && c.guildId === process.env.GUILD_ID)
		.map((channel) => {
			if (channel.type === "GUILD_TEXT") {
				return { id: channel.id, name: channel.name };
			}
		});

	res.json(channels);
});

router.get("/roles", async function (req: express.Request, res: express.Response): Promise<void> {
	const guild = await discord.api.guild.getGuild();
	const roles = guild.roles.cache.map((role) => {
		return { id: role.id, name: role.name };
	});

	res.json(roles);
});

router.post("/backgroundImage", async function (req: express.Request, res: express.Response): Promise<void> {
	if (!req.files) {
		res.status(500).send("No files sent");
		return;
	}

	try {
		const image = req.files.file;
		const username = req.body.username;
		const id = req.body.id;

		if (!image || !username || !id) {
			res.status(500).send("Non sono stati inseriti tutti i parametri necessari");
		}

		const base64 = Buffer.from(image.data).toString("base64");
		const data = await imgbbUploader({
			apiKey: process.env.IMGBB_TOKEN,
			name: `${username}-${process.env.FRONTEND_URL === "http://localhost:3006" ? "dev" : "prod"}`,
			base64string: base64,
		});

		if (!data) {
			res.status(500).send("Errore nell'upload dell'immagine");
		}

		const settings = await db.settings.get({});

		const copySettings = JSON.parse(JSON.stringify(settings));

		await db.settings.update(
			{},
			{
				...copySettings,
				rank: {
					...copySettings.rank,
					...{
						cards: copySettings.rank.cards.map((c) =>
							c.idDiscord === id
								? {
										...c,
										image: data.display_url,
								  }
								: c,
						),
					},
				},
			},
		);

		const newData = await db.settings.get({});

		res.json(newData || "Errore nella modifica dei settaggi / upload file");
	} catch (error) {
		console.log(error);
		res.status(500).send("Errore nell'upload dell'immagine");
		return;
	}
});

module.exports = router;
