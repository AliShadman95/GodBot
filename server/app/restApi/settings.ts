import express from "express";
import bot from "@app/core/token";
const router = express.Router();
import db from "@routes/api/database";
import { DiscordSettingsInterface } from "@app/types/databases.type";

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log("Time: ", Date.now());
	next();
});
// define the home page route
router.get("/", async function (req, res) {
	const settings = await db.settings.get({});
	res.json(settings);
});

router.put("/", async function (req, res) {
	try {
		const settings = req.body as DiscordSettingsInterface;
		await db.settings.update({}, settings);

		const newData = await db.settings.get({});

		res.json(newData || "Errore nella modifica dei settaggi");
	} catch {
		res.send("Errore nella modifica dei settaggi");
	}
});

router.get("/voiceChannels", async function (req, res) {
	const channels = bot.channels?.cache
		?.filter((c) => c.type === "GUILD_VOICE")
		.map((channel) => {
			if (channel.type === "GUILD_VOICE") {
				return { id: channel.id, name: channel.name };
			}
		});

	res.json(channels);
});

router.get("/textChannels", async function (req, res) {
	const channels = bot.channels?.cache
		?.filter((c) => c.type === "GUILD_TEXT")
		.map((channel) => {
			if (channel.type === "GUILD_TEXT") {
				return { id: channel.id, name: channel.name };
			}
		});

	res.json(channels);
});

module.exports = router;
