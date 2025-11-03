import express from "express";
import { submitTestController, getAllTestsController } from "../controllers/test.controller.js";

const router = express.Router();

router.post("/", submitTestController);
router.get("/", getAllTestsController);

export default router;
