import { Router } from "express";
import { signUpController } from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", signUpController);

export default router;
