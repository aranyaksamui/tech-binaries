// Requiring project dependencies
dotenv.config();
import path, { dirname } from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Current directory
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Importing routers from routes
import homeRouter from "./routes/home_router.js";
import postsRouter from "./routes/posts_router.js";
import categoryRouter from "./routes/category_router.js";
import userRouter from "./routes/user_router.js";

const app = express();

const clientBuildPath = path.join(__dirname, "client/build");
app.use(express.static(clientBuildPath))

// Middleware
app.use(cors({ credentials: true, origin: "" || "http://localhost:3000" }));
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Routes
app.use("/api/home", homeRouter); // Home route
app.use("/api/posts", postsRouter); // Posts route
app.use("/api/category", categoryRouter); // Category route
app.use("/api/users", userRouter); // User route

// Listen to dev or production server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
