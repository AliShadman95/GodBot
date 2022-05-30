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
	const users = await db.rank.getAll();
	res.json(users);
});

router.put("/resetRanks", async function (req, res) {
	await db.rank.updateMany({ id: { $in: req.body } }, { $set: { points: "0" } });
	res.json("Update Successful");
});

router.put("/resetAllRanks", async function (req, res) {
	const users = await db.rank.getAll();
	await db.rank.updateMany({ id: { $in: users.map((u) => u.id) } }, { $set: { points: "0" } });
	res.json("Update Successful");
});

module.exports = router;
