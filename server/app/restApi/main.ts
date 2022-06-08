import express from "express";
import bot from "@app/core/token";
const router = express.Router();
import db from "@routes/api/database";
import jwt from "jsonwebtoken";
import logger from "@app/functions/utils/logger";
import config from "@app/configs/auth.config";

// middleware that is specific to this router
router.use(function timeLog(req: express.Request, res: express.Response, next) {
	logger.info(`Time: ${Date.now()}`, "auth.ts:timeLog()");
	next();
});

router.get("/", async function (req: express.Request, res: express.Response): Promise<void> {
	res.send("HEllO, YOU PINGED ME ?!");
});

module.exports = router;
