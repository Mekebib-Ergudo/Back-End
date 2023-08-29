const { getAnswerAndUser, ans, getAnswer } = require("./answer");
module.exports = {
	answerQuestion: (req, res) => {
		const { answer, question_id, user_id } = req.body;
		if (!answer || !question_id || !user_id) {
			return res.status(400).json({ msg: "All fields should be provided..!" });
		}
		ans(req.body, (err, result) => {
			if (err) {
				return res.status(500).json({ msg: "Db connection error..!" });
			}
			return res
				.status(200)
				.json({ msg: "answer added successfully..!", data: result });
		});
	},

	// Question and User
	answerByUsers: (req, res) => {
		getAnswerAndUser((err, result) => {
			if (err) return res.status(500).json({ msg: "Db conncection error..!" });
			return res.status(200).json({ data: result });
		});
	},
};
