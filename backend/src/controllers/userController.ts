import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";

// login logic
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check empty fields
  if (!email || !password) {
    return res.status(400).json({
      message: "Email & password are requrired",
    });
  }

  try {
    // check user on db
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found please register",
      });
    }

    const validpassword = await bcrypt.compare(password, user.password);

    if (!validpassword) {
      return res.status(400).json({
        message: "Password is wrong",
      });
    }

    // valid user logic

    //create jwt token
    const token = jwt.sign(
      { email: user.email, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      httpOnly: false,
      path: "/",
      expires: new Date(Date.now() + 3600000),
    });

    res.status(200).json({ message: "User Login successful." });
  } catch (error) {
    // Handle any errors that might occur during the database query
    console.error("Error checking user availability:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// register

export const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  // check empty fields
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Email Username & password are requrired",
    });
  }

  try {
    // Check if the username already exists
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists. Please login.",
      });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await UserModel.create({
      email: email,
      username: username,
      password: hashedPassword, // Use the hashed password
    });

    // Send a success response
    res.status(200).json({
      message: "Registration completed.",
      data: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

// jwt check
export const jwtcheck = async (req: Request, res: Response) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    //check if jwt valid
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

    res.status(200).json({
      message: "JWT verification successful.",
      data: decodedToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
