import { Router } from "express";
const router = Router();

import { apiWelcome, logIn } from "../controllers/api.controller";

router.route('/')
    .get(apiWelcome);

router.route('/login')
    .post(logIn);

export default router;