import express from "express";
import bot from "@app/core/token";
const router = express.Router();
import db from "@routes/api/database";
import jwt from "jsonwebtoken";
import logger from "@app/functions/utils/logger";
import config from "@app/configs/auth.config";

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log("Time: ", Date.now());
	logger.info(`Time: ${Date.now()}`, "auth.ts:timeLog()");
	next();
});

router.post("/login", async function (req, res) {
	try {
		const { username, password } = req.body;

		const user = await db.users.get({ username });

		if (user.id === "0") {
			return res.status(401).send("Utente non trovato");
		}

		const isPasswordValid = password === user.password;

		if (!isPasswordValid) {
			return res.status(401).send("Password non valida");
		}

		const token = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: 604800, // 24 hours = 86400 , 1 week = 604800
		});

		const { password: userPassword, ...rest } = user;

		res.status(200).send({ ...rest, accessToken: token });
	} catch (e) {
		logger.error(JSON.stringify(e), "auth.ts:/login()");
		res.send("Errore di login");
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
