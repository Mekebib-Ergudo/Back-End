const pool = require("../dataBase");

module.exports = {
	ans: (data, callback) => {
		pool.query(
			`INSERT INTO answer(answer,question_id,user_id)VALUES(?,?,?)`,
			[data.answer, data.question_id, data.user_id],
			(err, result) => {
				if (err) {
					return callback(err, null);
				}
				return callback(null, result);
			}
		);
	},
	// Get all Answer and  Users form Profile Table
	getAnswerAndUser: (callback) => {
		pool.query(
			`SELECT * FROM answer INNER JOIN profile ON answer.user_id = profile.user_id`,
			(err, result) => {
				if (err) return callback(err);
				return callback(null, result);
			}
		);
	},
};
