import express from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import signRoutes from "./sign.routes.js";
import testRoutes from "./test.routes.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user",protect, userRoutes);
router.use("/sign", signRoutes);
router.use("/test",protect, testRoutes);

export default router;
