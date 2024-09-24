import { createRentTransactionController, getRentTransactionbyIdController, paidTransactionController,getSubscriptionsController, getActiveRentalController, updateBatteryNameController,rentSummaryController } from "./rent_transaction.controller.js";
import { Router } from "express";
import { authenticateToken } from '../../config/auth.middleware.js';

const router = Router ();

router.post("/create", authenticateToken, createRentTransactionController);
router.get("/user", authenticateToken, getSubscriptionsController)
router.post("/summary", authenticateToken, rentSummaryController)
router.get("/active", authenticateToken, getActiveRentalController)
router.post("/paid", paidTransactionController);
router.patch("/update/:id", updateBatteryNameController)

router.get("/:id", getRentTransactionbyIdController);


export default router;