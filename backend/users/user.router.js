import { registration, resendOTPController, verifyOTPController, setPasswordController, updatePasswordController, dashboardController, forgotPasswordController, resetPasswordController} from "./user.controller.js";
import { authenticateToken } from '../../config/auth.middleware.js';
import { Router } from "express";

const router = Router();

router.post("/registration", registration);
router.post("/resend-otp", resendOTPController);
router.post("/verify-otp", verifyOTPController);
router.post("/set-password", setPasswordController);
router.patch("/update-password", authenticateToken, updatePasswordController);
router.get ("/dashboard", authenticateToken, dashboardController),
router.post ("/forgot-password", forgotPasswordController),
router.post("/reset-password", resetPasswordController)


export default router;