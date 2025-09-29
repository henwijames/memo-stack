import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { connectDb } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

// app.use((req, res, next) => {
//   console.log("We just got a new req");
//   next();
// });
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

connectDb().then(() => {
  app.listen(5001, () => {
    console.log(`Server Started on PORT: ${PORT}`);
  });
});
