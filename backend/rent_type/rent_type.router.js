import { createRentTypeController, getRentTypeController, getRentTypebyIdController, updateRentTypeController, deleteRentTypeController } from "./rent_type.controller.js";
import { Router } from "express";

const router = Router();

router.post("/create", createRentTypeController);
router.get("/", getRentTypeController);
router.get("/:id", getRentTypebyIdController);
router.patch("/update/:id", updateRentTypeController);
router.delete("/delete/:id", deleteRentTypeController);

export default router;