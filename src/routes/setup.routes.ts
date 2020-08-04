import { Router } from "express";
const router = Router();

import { createUser } from "../controllers/user.controller";

router.route('/')
    .post(createUser);

export default router;