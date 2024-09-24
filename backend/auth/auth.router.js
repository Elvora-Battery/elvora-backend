import { loginController } from "./auth.controller.js";

import { Router } from "express";

const router = Router();

router.post('/login', loginController);

export default router;

