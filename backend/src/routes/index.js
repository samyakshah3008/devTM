import { Router } from "express";

const router = Router();

import userRouter from "./user.routes.js";

router.use("/user", userRouter);

export default router;
