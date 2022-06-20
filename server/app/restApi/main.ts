import express from "express";
const router = express.Router();
import logger from "@app/functions/utils/logger";

// middleware that is specific to this router
router.use(function timeLog(req: express.Request, res: express.Response, next) {
	logger.info(`Time: ${Date.now()}`, "main.ts:timeLog()");
	next();
});

router.get("/", async function (req: express.Request, res: express.Response): Promise<void> {
	res.send("HEllO, YOU PINGED ME ?!");
});

module.exports = router;
