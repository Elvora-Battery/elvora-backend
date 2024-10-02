import { subscriptionNotifController, getAllNotificationsController, getNotificationByIdController } from "./notifications.controller.js";

import { Router } from "express";
import { authenticateToken } from '../../config/auth.middleware.js';

const router = Router (); 

router.post ("/subscription", authenticateToken, subscriptionNotifController)
router.get ("/all", authenticateToken, getAllNotificationsController)
router.get ("/:id", getNotificationByIdController)

export default router;

