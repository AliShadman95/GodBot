/* import express from "express";
const router = express.Router();
import db from "@routes/api/database";
import logger from "@app/functions/utils/logger";

// middleware that is specific to this router
router.use(function timeLog(req: express.Request, res: express.Response, next): void {
	logger.info(`Time: ${Date.now()}`, "users.ts:timeLog()");
	next();
});
// define the home page route
router.get("/card", async function (req: express.Request, res: express.Response): Promise<void> {
	if (!req.query || !req.query?.id) {
		return res.status(500).send({ message: "Id paramter required!" });
	}
	const user = await db.users.get({ idDiscord: req.query.id });
	if (!user) {
		return res.status(500).send({ message: "User not found" });
	}
	res.json(user.card);
});

module.exports = router;
 */
