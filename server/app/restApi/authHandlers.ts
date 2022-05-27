import jwt from "jsonwebtoken";
import config from "@app/configs/auth.config";

const verifyToken = (req, res, next) => {
	let token = req.headers["authorization"];
	if (!token) {
		return res.status(403).send({ message: "No token provided!" });
	}
	token = token.replace("Bearer", "").trim();

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: "Unauthorized!" });
		}
		req.username = decoded.username;
		next();
	});
};

const authJwt = {
	verifyToken,
};
module.exports = authJwt;
