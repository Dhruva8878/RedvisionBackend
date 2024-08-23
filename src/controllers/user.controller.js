import User from "../models/user.model.js"
import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

const generateToken = (user) => {
  return jwt.sign({ user }, SECRET_KEY);
  // return jwt.sign({ user }, "hello");
};

export const users = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).send({ user });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }

    user = await User.create(req.body);

    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Wrong Email or Password");
    }
    const match = user.checkPassword(req.body.password);

    if (!match) {
      return res.status(400).send({ message: "Wrong Email or Password" });
    }

    const token = generateToken(user);
    return res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};
