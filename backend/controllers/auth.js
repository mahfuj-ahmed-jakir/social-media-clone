const User = require("../models/User.js");
const { emailValidation, lengthValidation, usernameValidation } = require("../helpers/validation.js");
const bcrypt = require("bcryptjs");
const { tokenGenerate } = require("../helpers/tokens.js");
const { sendEmailVerification } = require("../helpers/mailer.js");

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, gender, bYear, bMonth, bDay } = req.body;

    // email validation
    if (!emailValidation(email)) {
      return res.status(400).json({ message: "Invalid email address!" });
    }

    // new email checking
    const check = await User.findOne({ email });

    if (check) {
      return res.status(400).json({ message: "This email already in use!" });
    }

    // email length check
    if (lengthValidation(email, 8, 40)) {
      return res.status(400).json({ message: "Invalid email length!" });
    }

    // first name length check
    if (lengthValidation(first_name, 3, 30)) {
      return res.status(400).json({ message: "First name must be need 3-30 character!" });
    }

    // last name length check
    if (lengthValidation(last_name, 3, 30)) {
      return res.status(400).json({ message: "Last name must be need 3-30 character!" });
    }

    // password length check
    if (lengthValidation(password, 6, 40)) {
      return res.status(400).json({ message: "Password must be need 6-40 character!" });
    }

    // password hash
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);

    // username validate
    const tempUsername = await usernameValidation((first_name + last_name).toLocaleLowerCase());

    // return;

    const user = await new User({
      first_name,
      last_name,
      username: tempUsername,
      email,
      password: hash,
      gender,
      bYear,
      bMonth,
      bDay,
    }).save();

    // email token generate
    const emailTokenValidation = tokenGenerate({ id: user._id }, "30m");

    // email activation link generate
    const url = `${process.env.BASE_URL}/activate/${emailTokenValidation}`;

    // send email verification
    sendEmailVerification(user.email, user.first_name, url);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = (req, res) => {
  console.log(req.body);
  res.send(req.body);
};
