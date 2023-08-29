require("dotenv").config();
const pool = require("../dataBase");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { register, profile, getByEmail, userById } = require("./service");

module.exports = {
	createUser: async (req, res) => {
		const { userName, email, password, firstName, lastName } = req.body;
		if (!userName || !email || !password || !firstName || !lastName) {
			return res.status(400).json({ msg: "All Fields required..!" });
		}
		if (password.length < 5) {
			return res
				.status(400)
				.json({ msg: "password length must be five or more..!" });
		}
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			// Check if an account with the given email is already exists
			pool.query(
				`SELECT * FROM registration WHERE user_email = ?`,
				[email],
				(err, result) => {
					if (err) {
						console.log("Error while retrieving user by email:", err);
						return res.status(500).json({ msg: "Db connection Error ..." });
					}
					if (result.length > 0) {
						return res.status(400).json({
							msg: "An account with this email already exists!",
						});
					}
					const registrationData = {
						userName,
						email,
						password: hashedPassword,
					};
					register(registrationData, (registerErr, result) => {
						if (registerErr) {
							console.log(registerErr);
							return res.status(500).json({ msg: "Db connection Error..!" });
						}
						//
						const userId = result.insertId;
						// Insert user profile data
						const userProfile = { userId, firstName, lastName };
						profile(userProfile, (profileErr, result) => {
							if (profileErr) {
								console.log(profileErr);
								return res.status(500).json({ msg: "Db connection Error...!" });
							}

							return res
								.status(200)
								.json({ msg: "New user added successfully!", data: result });
						});
					});
				}
			);
		} catch (error) {
			console.error("Error while creating user:", error);
			return res.status(500).json({ msg: "Error while creating user" });
		}
	},

	// Login....
	login: (req, res) => {
		const { password, email } = req.body;
		if (!email || !password) {
			return res
				.status(400)
				.json({ msg: "Please provide User email And password!" });
		}

		getByEmail(email, (err, result) => {
			if (err) {
				return res.status(500).json({ emailError: "Db Connection Error...!" });
			}
			if (!result) {
				return res
					.status(400)
					.json({ msg: "There is no User by  provided  email!" });
			}

			const isMatch = bcrypt.compareSync(password, result.user_password);
			if (!isMatch) return res.status(404).json({ msg: "Invalid Credentail" });

			const token = jwt.sign({ user_id: result.user_id }, process.env.Secret, {
				expiresIn: "60m",
			});
			return res.status(200).json({
				token,
				user: {
					display_name: result.user_name,
					id: result.user_id,
				},
			});
		});
	},
};
