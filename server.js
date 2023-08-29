require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT;
const pool = require("./Server/dataBase");
const router = require("./Server/router");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Checking server connection
app.get("/api/createUser", (req, res) =>
	res.status(200).json({ msg: "Srever is connected..!" })
);

// Using the router for user-related routes
app.use("/api/users", router);
app.listen(port, () =>
	console.log(`Server is Running at http://localhost:${port}`)
);
