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
