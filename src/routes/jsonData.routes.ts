import { Router } from "express";
const router = Router();

import { getJsonData, createJsonData } from "../controllers/jsonData.controller";
import { checkJwt } from "../middlewares/checkJwt";

router.route('/')
    .get(checkJwt, getJsonData)
    .post(checkJwt, createJsonData);

export default router;