import express from 'express';
import { getAllSignsController } from '../controllers/sign.controller.js';

const router = express.Router();

router.get('/', getAllSignsController);

export default router;
