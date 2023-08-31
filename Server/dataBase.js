require("dotenv").config();
const mysql = require("mysql2");
// make connection with our dataBase

// const pool = mysql.createPool({
// 	host: process.env.Host,
// 	user: process.env.user_Name,
// 	database: process.env.Db_Name,
// 	password: process.env.Password,
// 	waitForConnections: true,
// 	connectionLimit: 10,
// 	port: process.env.Db_Port,
// 	socket: process.env.Db_Socket,
// });

// Planet Db
const pool = mysql.createConnection(process.env.DATABASE_URL);

//  create connection with our Db
// pool.getConnection((err, connection) => {
// 	if (err) console.log(err);
// 	console.log("Db COnnected..!");
// });

// create Tables...
let registration = `CREATE TABLE if not exists registration (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
)`;
let profile = `CREATE TABLE  if not exists profile (
    user_profile_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
)`;
let question = `CREATE TABLE if not exists question (
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(355) NOT NULL,
    question_description VARCHAR(255) NOT NULL,
    user_id INT NOT NULL
    
)`;
let answer = `CREATE TABLE  if not exists answer (
    answer_id INT PRIMARY KEY AUTO_INCREMENT,
    answer VARCHAR(855) NOT NULL,
    user_id INT NOT NULL,
    question_id INT NOT NULL
    
)`;

pool.query(registration, (err, result) => {
	if (err) console.log(err);
	else console.log("Registration Table is Created..!");
});
pool.query(profile, (err, result) => {
	if (err) console.log(err);
	else console.log("Profile Table is Created..!");
});
pool.query(question, (err, result) => {
	if (err) console.log(err);
	else console.log("Question Table is Created..!");
});
pool.query(answer, (err, result) => {
	if (err) console.log(err);
	else console.log("Answer Table is Created..!");
});

module.exports = pool;
