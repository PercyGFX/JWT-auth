import express from "express";
const router = express.Router();
import { login, register } from "../controllers/userController.js";

// login endpoint
router.post("/login", login);

// register endpoint

router.post("/register", register);

export default router;
