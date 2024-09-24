import { createShippingController, editShippingController, deleteShippingController, getShippingController, getShippingByIdController } from "./shipping.controller.js";
import { authenticateToken } from '../../config/auth.middleware.js';
import { Router } from "express";

const router = Router();

router.post("/create", authenticateToken, createShippingController);
router.patch("/edit/:id", editShippingController);
router.get("/", getShippingController)
router.get("/:id", getShippingByIdController);
router.delete("/delete/:id", deleteShippingController);

export default router;