import express from "express";
const router = express.Router();
import db from "@routes/api/database";
import logger from "@app/functions/utils/logger";

// middleware that is specific to this router
router.use(function timeLog(req: express.Request, res: express.Response, next): void {
	logger.info(`Time: ${Date.now()}`, "ranks.ts:timeLog()");
	next();
});
// define the home page route
router.get("/", async function (req: express.Request, res: express.Response): Promise<void> {
	const users = await db.rank.getAll();
	res.json(users);
});

// define the home page route
router.get("/rank", async function (req: express.Request, res: express.Response): Promise<void> {
	const users = await db.rank.get({ id: req.query.id });

	const response =
		users.id !== "0"
			? users
			: {
					id: "0",
					username: req.query.username,
					bot: false,
					points: "0",
					secondInVoiceChat: 0,
					messageAwarded: 0,
					avatar: "0",
			  };

	res.json(response);
});

router.put("/resetRanks", async function (req: express.Request, res: express.Response): Promise<void> {
	await db.rank.updateMany({ id: { $in: req.body } }, { $set: { points: "0" } });
	res.json("Update Successful");
});

router.put("/resetAllRanks", async function (req: express.Request, res: express.Response): Promise<void> {
	const users = await db.rank.getAll();
	await db.rank.updateMany({ id: { $in: users.map((u) => u.id) } }, { $set: { points: "0" } });
	res.json("Update Successful");
});

module.exports = router;
