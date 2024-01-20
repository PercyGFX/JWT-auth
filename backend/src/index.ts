import express from "express";
const app = express();
import cors from "cors";
import * as dotenv from "dotenv";
import { ConnectToMongoDB } from "./utils/database.js";

// Configure CORS to allow requests from your frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Replace with your frontend's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// mongo connect
ConnectToMongoDB(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("helloo");
});

const port = process.env.PORT || 5000; // port

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
