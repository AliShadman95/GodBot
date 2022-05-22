import express from "express";
import bot from "@app/core/token";
const router = express.Router();
import db from "@routes/api/database";
import { DiscordUsersInferface } from "@app/types/databases.type";
import jwt from "jsonwebtoken";
import config from "@app/configs/auth.config";

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log("Time: ", Date.now());
	next();
});

router.post("/login", async function (req, res) {
	try {
		/* const settings = req.body as DiscordSettingsInterface;
		await db.settings.update({}, settings); */
		const { username, password } = req.body;
		console.log(req.body);

		const user = await db.users.get({ username });

		if (user.id === "0") {
			return res.status(404).send("User not found");
		}

		const isPasswordValid = password === user.password;

		if (!isPasswordValid) {
			return res.status(401).send({
				accessToken: null,
				message: "Invalid Password!",
			});
		}

		const token = jwt.sign({ id: user.id }, config.secret, {
			expiresIn: 86400, // 24 hours
		});

		const { password: userPassword, ...rest } = user;

		res.status(200).send({ ...rest, accessToken: token });
	} catch (e) {
		console.log(e);
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
