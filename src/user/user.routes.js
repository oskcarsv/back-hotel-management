import {Router} from 'express';

import {check} from 'express-validator';

import {createUser, listUsers} from '../user/user.controller.js';

import {validateJWT} from '../middleware/validate-jwt.js';

import {validateFields, validateRol} from '../middleware/validate-fields.js';

import { existentEmail, existentUsername, existentRole } from "../helpers/db-validator.js";

import { validationPassword } from "../helpers/data-validator.js";

const router = Router();

router.get("/", listUsers);

router.post(

    "/",
    [
        validateJWT,
        check("name", "Name is required.").not().isEmpty(),
        check("username", "username is required").not().isEmpty(),
        check("username").custom(existentUsername),
        check("password", "Password must be greater than 6 characters.").isLength({
            min: 6,
        }),
        check("password").custom(validationPassword),
        check("email", "This is not a valid email.").isEmail(),
        check("email").custom(existentEmail),
        check("role").custom(existentRole),
        validateRol,
        validateFields,

    ], createUser

);

export default router;