import bcrypt from "bcrypt";
import UserModel from "../models/user.models.js";
import { signToken } from "../lib/jwt.js";
import { constants } from "node:http2";

const SALT_ROUNDS = 10;
export async function register(req, res) {
  const { email, password, name, phone } = req.body;
  if (!email || !password) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "Email or Password is required",
    });
  }
  const existingUser = await UserModel.getByEmail(email);
  if (existingUser) {
    return res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .json({ message: "Email is already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const newUser = await UserModel.create({
    email,
    password: hashedPassword,
    name,
    phone,
  });
  const { password: _password, ...userWithoutPassword } = newUser;
  res.status(constants.HTTP_STATUS_CREATED).json({
    success: true,
    message: "Registered Successfully",
    result: newUser,
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(constants.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "Email or Password is required",
    });
  }
  const user = await UserModel.getByEmail(email);

  if (!user) {
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const token = signToken({ id: user.id, email: user.email });

  res.json({
    success: true,
    message: "Login Successfully",
    result: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}

export async function getAllUser(req, res) {
  const users = await UserModel.getAll();
  const usersWithoutPassword = users.map(({ password, ...rest }) => rest);
  return res.json(usersWithoutPassword);
}
