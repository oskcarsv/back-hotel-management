import { Router } from 'express';

import { check } from 'express-validator';

import { addHotel } from '../hotel/hotel.controller.js';

import { notExistentBedNameArray } from '../helpers/db-validator.js';

import { validateJWT } from '../middleware/validate-jwt.js';

import { validateFields } from '../middleware/validate-fields.js';

const router = Router();

router.post(

    "/",
    [
        validateJWT,
        check("hotelName").not().isEmpty(),
        check("hotelDirection").not().isEmpty(),
        check("hotelNumber").not().isEmpty(),
        check("bedroomName").not().isEmpty(),
        check("bedroomName").custom(notExistentBedNameArray),
        validateFields
    ], addHotel

);

export default router;