const pool = require("../dataBase");

module.exports = {
	askQuestion: (data, callback) => {
		pool.query(
			`INSERT INTO question(question,question_description,user_id)VALUES(?,?,?)`,
			[data.question, data.question_description, data.user_id],
			(err, result) => {
				if (err) return callback(err);
				return callback(null, result);
			}
		);
	},

	getQuestionAndUser: (callback) => {
		pool.query(
			`SELECT * FROM question INNER JOIN profile ON question.user_id = profile.user_id`,
			(err, result) => {
				if (err) return callback(err);
				return callback(null, result);
			}
		);
	},
};
