const pool = require("../dataBase");
const Reg_Stat =
	"INSERT INTO registration (user_name, user_email, user_password) VALUES (?, ?, ?)";
const Prof_Stat =
	"INSERT INTO profile (user_id, first_name, last_name) VALUES (?, ?, ?)";
const dataById = `SELECT registration.user_id, user_name, user_email, first_name, last_name
  FROM registration
  LEFT JOIN profile ON registration.user_id = profile.user_id
  WHERE registration.user_id = ?`;
module.exports = {
	register: (data, callback) => {
		pool.query(
			Reg_Stat,
			[data.userName, data.email, data.password],
			(err, result) => {
				if (err) {
					console.log("Error while registering user:", err);
					return callback(err);
				}
				return callback(null, result);
				// Passing null as the first argument indicates no error.
			}
		);
	},

	profile: (data, callback) => {
		pool.query(
			Prof_Stat,
			[data.userId, data.firstName, data.lastName],
			(err, result) => {
				if (err) {
					console.log(`Error while Creating our profile Table ${err}`);
					return callback(err);
				}
				return callback(null, result);
			}
		);
	},

	getByEmail: (email, callback) => {
		pool.query(
			`SELECT * FROM registration WHERE user_email = ?`,
			[email],
			(err, res) => {
				if (err) {
					console.error("Error while retrieving user by email:", err);
					return callback(err, null);
				}
				return callback(null, res[0]);
			}
		);
	},
	getAllUsers: (callback) => {
		pool.query(
			`SELECT user_id, user_name, user_email FROM registration`,
			[],
			(err, res) => {
				if (err) {
					console.error("Error while retrieving all users:", err);
					return callback(err, null);
				}
				return callback(null, res);
			}
		);
	},
};
