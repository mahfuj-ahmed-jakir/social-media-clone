const jwt = require("jsonwebtoken");

exports.tokenGenerate = (payload, expired) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expired,
  });
};
