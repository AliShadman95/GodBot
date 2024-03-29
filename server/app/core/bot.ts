/* eslint-disable @typescript-eslint/no-var-requires */
import db from "@routes/api/database";
import commands from "@app/routes/commands";
import express from "express";
import bot from "@app/core/token";
import cors from "cors";
import fileUpload from "express-fileupload";

const settings = require("@app/restApi/settings");
const auth = require("@app/restApi/auth");
const ranks = require("@app/restApi/ranks");
const main = require("@app/restApi/main");
const authJwt = require("@app/restApi/authHandlers");

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const app = express();
app.use(cors());

app.use(
	fileUpload({
		createParentPath: true,
	}),
);

const port = process.env.PORT || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => logger.info("REST API is ready...", "bot.ts:main()"));

app.use("/", main);
app.use("/settings", authJwt.verifyToken, settings);
app.use("/auth", auth);
app.use("/ranks", authJwt.verifyToken, ranks);

/**
 * Start bot
 * =====================
 *
 * Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
 *
 * @license: MIT License
 *
 */
import logger from "@app/functions/utils/logger";
import { TextChannel } from "discord.js";

(async () => {
	logger.info("Bot is starting...", "bot.ts:main()");

	await db.connection.connectDB();

	await commands.commandsHandler();
	await commands.launch();
	await commands.voiceDetection();
})();

process.on("SIGTERM", async function () {
	const settings = await db.settings.get({});
	const channel = bot.channels.cache.get(settings?.rank?.botInfoChannelId) as TextChannel;
	channel.send(settings?.rank?.botRestartMessage);
	await db.connection.disconnectDB();
	process.exit(1);
});

process.on("SIGINT", async function () {
	// on CTRL-C
	await db.connection.disconnectDB();
	process.exit(1);
});

process.once("SIGUSR2", async function () {
	// On nodemon refresh
	await db.connection.disconnectDB();
});

process.on("uncaughtException", async function (error) {
	console.log("An error uncaughtException has occured. error is: %s", error);
	console.log("Process will restart now.");
	await db.connection.disconnectDB();

	process.exit(1);
});

process.on("unhandledRejection", async function (error) {
	console.log("An error unhandledRejection has occured. error is: %s", error);
	console.log("Process will restart now.");
	await db.connection.disconnectDB();
	process.exit(1);
});
