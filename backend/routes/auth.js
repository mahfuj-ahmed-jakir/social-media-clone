let { register, login } = require("../controllers/auth.js");
let express = require("express");
let router = express.Router();

// Registration new user
router.post("/auth/register", register);

// Login exiting user
router.post("/auth/login", login);

module.exports = router;
