const { answerQuestion, answerByUsers } = require("./answer/answerAuth");
const { ask, questionByUsers } = require("./questions/questionAuth");
const { createUser, login } = require("./users/ authentication");
const router = require("express").Router();

//  Creating Users  Route...
router.post("/", createUser);
router.post("/login", login);

// question Route...
router.post("/ask", ask);
router.get("/questionanduser", questionByUsers);

// Answer Route..

router.post("/answer", answerQuestion);
router.get("/allAnswer", answerByUsers);

module.exports = router;
