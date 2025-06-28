import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();

console.clear();

// Connect to MongoDB
await connectDB();

// CORS Configuration
app.use(
  cors({
    origin: "https://ivruhs-writes-fqqr.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

export default app;
