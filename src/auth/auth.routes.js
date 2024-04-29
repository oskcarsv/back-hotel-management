import { Router } from "express";
import { check } from "express-validator";
import { login } from "./auth.controller.js";
import { validateFields } from "../middleware/validate-fields.js";

const router = Router();

router.post(
    '/login',
    [
        check('usernameOrEmail', 'Its obligatory a username or a email').not().isEmpty(),
        check('password', 'Is Obligatory the password').not().isEmpty(),
        validateFields,
    ],
    login
);

export default router;