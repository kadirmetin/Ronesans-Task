const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please fill out all fields!" });
    }

    const isExistingUser = await User.findOne({
      where: {
        username: username,
      },
    });

    if (isExistingUser) {
      return res.status(400).json({ message: "This username is in use." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "The password cannot be less than 8 characters." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      username,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "Your account has been successfully created." });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "There was an error creating a account." });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please fill out all fields!" });
    }

    const isExistingUser = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!isExistingUser) {
      return res
        .status(400)
        .json({ message: "There are no such accounts registered." });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isExistingUser.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ message: "You entered an invalid username or password." });
    }

    const token = jwt.sign(
      { user_id: isExistingUser.user_id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.status(200).json({
      message: "Login successful!",
      token: token,
      user: {
        user_id: isExistingUser.user_id,
        username: isExistingUser.username,
      },
    });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ message: "An error occurred while logging in." });
  }
};

module.exports = { register, login };
