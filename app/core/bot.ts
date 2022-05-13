import db from "@routes/api/database";
import commands from "@app/routes/commands";
/* import express from "express";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
	res.send("Hello World, from express");
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`)); */

/**
 * Start bot
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *                Alì Shadman [@AliShadman95] (https://github.com/AliShadman95)
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
})();

process.on("SIGINT", async function () {
	// on CTRL-C
	await db.connection.disconnectDB();
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
