/* eslint-disable @typescript-eslint/no-var-requires */
import db from "@routes/api/database";
import commands from "@app/routes/commands";
import express from "express";
import cors from "cors";
const settings = require("@app/restApi/settings");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

app.use("/settings", settings);

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

(async () => {
	logger.info("Bot is starting...", "bot.ts:main()");

	await db.connection.connectDB();

	await commands.commandsHandler();
	await commands.launch();
	await commands.voiceDetection();
})();

process.on("SIGINT", async function () {
	// on CTRL-C
	await db.connection.disconnectDB();
	process.exit(1);
});

process.once("SIGUSR2", async function () {
	// On nodemon refresh
	await db.connection.disconnectDB();
});

process.on("uncaughtException", function (error) {
	console.log("An error uncaughtException has occured. error is: %s", error);
	console.log("Process will restart now.");
	process.exit(1);
});

process.on("unhandledRejection", function (error) {
	console.log("An error unhandledRejection has occured. error is: %s", error);
	console.log("Process will restart now.");
	process.exit(1);
});