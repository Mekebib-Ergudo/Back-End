const { askQuestion, getQuestionAndUser } = require("./questions");
module.exports = {
	ask: (req, res) => {
		const { question, question_description, user_id } = req.body;
		if (!question || !question_description || !user_id) {
			return res.status(400).json({ msg: "All fields should be provided..!" });
		}
		askQuestion(req.body, (err, result) => {
			if (err) return res.status(500).json({ msg: "Db connection error..!" });
			return res
				.status(200)
				.json({ msg: "question added successfully..!", data: result });
		});
	},

	// question and user
	questionByUsers: (req, res) => {
		getQuestionAndUser((err, result) => {
			if (err) return res.status(500).json({ msg: "Db connection error..!" });
			return res.status(200).json({ data: result });
		});
	},
};
