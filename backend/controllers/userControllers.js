import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { OAuth2Client } from "google-auth-library";
// const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(
  "757700505520-mudq4nhvm3knoh1i0t23vsttij7mlmei.apps.googleusercontent.com"
);

// desc: Register a user
// path: /api/users/register
// method: POST
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("وارد کردن نام و ایمیل و رمز الزامی است.");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.generateToken();

  res.status(201).json({ user, token });
});

// desc: login a user
// path: /api/users/login
// method: POST
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("وارد کردن ایمیل و رمز الزامی است.");
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.checkPassword(password))) {
    res.status(401);
    throw new Error("رمز یا ایمیل اشتباه است.");
  }

  res.json({ user, token: user.generateToken() });
});
