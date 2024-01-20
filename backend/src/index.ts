import express from "express";
const app = express();
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import { ConnectToMongoDB } from "./utils/database.js";
import router from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";

// Configure CORS to allow requests from your frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// mongo connect
ConnectToMongoDB(process.env.MONGO_URI);

// routes
app.use("/", router);

app.get("/", (req, res) => {
  res.send("helloo from 5000");
});

const port = process.env.PORT || 5000; // port

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
