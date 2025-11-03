import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.js";
import { errorHandler } from "./utils/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Serve static files (images/assets)
app.use("/images", express.static(path.join(__dirname, "public/images")));

// API Routes
app.use("/api", router);

// Global error handler
app.use(errorHandler);

export default app;
