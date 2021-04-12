import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

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
