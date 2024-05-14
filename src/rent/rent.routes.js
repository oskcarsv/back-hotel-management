import { Router } from 'express';
import { check } from 'express-validator';
import { addRent, updateRent, getRentList, getRentById, deleteRent} from '../rent/rent.controller.js'; 
import { existentUsername, existentHotel, existentBedroom } from '../helpers/db-validator.js';

const router = Router();

router.post(
    "/add",
    [
        check("nameClient").not().isEmpty(),
        check("nameHotel").not().isEmpty(),
        check("nameBedroom").not().isEmpty(),
        check("startDate").not().isEmpty(),
        check("endDate").not().isEmpty(),
        check("price").not().isEmpty(),
        check("nameClient").custom(existentUsername),
        check("nameHotel").custom(existentHotel),
        check("nameBedroom").custom(existentBedroom),
    ],addRent
    
);

router.get("/", 
    getRentList
);

router.get("/:id", 
    getRentById
);

router.put(
    "/:id",
    [
        check("id").isMongoId().withMessage("Invalid rental ID"),
    ],updateRent
);

router.delete(
    "/:id",
    [
        check("id").isMongoId().withMessage("Invalid rental ID"),
    ],
    deleteRent
);

export default router;