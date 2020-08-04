import { Router } from "express";
const router = Router();

import { getUsers, createUser, getUser, deleteUser, updateUser } from "../controllers/user.controller";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

router.route('/')
    .get([checkJwt, checkRole], getUsers)
    .post([checkJwt, checkRole], createUser);

router.route('/:user')
    .get([checkJwt, checkRole], getUser)
    .delete([checkJwt, checkRole], deleteUser)
    .put([checkJwt, checkRole], updateUser);

export default router;