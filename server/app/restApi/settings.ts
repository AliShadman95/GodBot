import express from "express";
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

		res.json((await db.settings.get({})) || "Errore nella modifica dei settaggi");
	} catch {
		res.send("Errore nella modifica dei settaggi");
	}
});

module.exports = router;
