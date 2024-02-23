const CryptoJS = require("crypto-js");
const User = require("../model/user.model");

const signupHandler = async (req, res) => {
  try {
    const user = await User.findOne({ number: req.body.number });
    user && res.status(409).json({ message: "User already exists" });
    if (!user) {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        number: req.body.number,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASSWORD_SECRECT_KEY
        ).toString(),
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error creating a user" });
  }
};

module.exports = signupHandler;
