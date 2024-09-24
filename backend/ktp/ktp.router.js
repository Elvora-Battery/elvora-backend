import { createKTPController, verifyKTP } from "./ktp.controller.js";
import { authenticateToken } from '../../config/auth.middleware.js';
import { Router } from "express";
import Multer from "multer";
const upload = Multer()

const router = Router();

router.post("/create", authenticateToken, createKTPController);
router.post("/verify", verifyKTP);

export default router;