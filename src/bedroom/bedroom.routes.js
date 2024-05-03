import { Router } from 'express';

import { check } from 'express-validator';

import { addBedroom, deleteBedroom, listBedroom, updateBedroom } from '../bedroom/bedroom.controller.js';

import { existentBedName, notExistentBedName } from '../helpers/db-validator.js';

import { validateJWT } from '../middleware/validate-jwt.js';

import { validateFields } from '../middleware/validate-fields.js';

const router = Router();

router.get("/", listBedroom);

router.post(

    "/",
    [
        validateJWT,
        check("bedroomName").not().isEmpty(),
        check("bedroomName").custom(existentBedName),
        check("bedroomPrize").not().isEmpty(),
        check("bedroomCapacity").not().isEmpty(),
        check("bed").not().isEmpty(),
        validateFields

    ], addBedroom

)

router.put(

    "/",
    [
        validateJWT,
        check("findBedroomName").not().isEmpty(),
        check("findBedroomName").custom(notExistentBedName),
        validateFields
    ], updateBedroom

)

router.delete(

    "/",
    [
        validateJWT,
        check("bedroomName").not().isEmpty(),
        check("bedroomName").custom(existentBedName),
        validateFields
    ], deleteBedroom

)

export default router;