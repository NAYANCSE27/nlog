const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = async (req, res) => {
  // console.log(req.body);

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).json({
      error: "Email is taken",
    });
  }

  const { name, email, password } = req.body;
  let username = shortId.generate();
  let profile = `${process.env.CLIENT_URL}/profile/${username}`;

  let newUser = new User({ name, email, password, profile, username });

  try {
    await newUser.save();
    res.json({
      message: "Signup success! Please signin.",
      // user: newUser,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email: req.body.email });

  if (user) {
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match.",
      });
    }
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  } else {
    return res.status(400).json({
      error: "User with that email does not exist. Please signup.",
    });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

exports.requireSignin = expressJwt.expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
