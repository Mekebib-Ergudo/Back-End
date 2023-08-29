require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
	try {
		const token = req.header("x-auth-token");
		if (!token)
			return res
				.status(401)
				.json({ msg: "No authentication token, authorization denied." });

		const verified = jwt.verify(token, process.env.Secret);
		console.log(verified);
		if (!verified)
			return res
				.status(401)
				.json({ msg: "Token verification failed, authorization denied." });

		req.id = verified.user_id;
		// console.log(req.id == 1);
		next();
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = authenticateToken;
