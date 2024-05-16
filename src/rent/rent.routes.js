import { Router } from 'express';
import { check } from 'express-validator';
import { addRent, updateRent, listRent, getRentById, deleteRent} from '../rent/rent.controller.js'; 
import { existentHotel, notExistentBedName } from '../helpers/db-validator.js';

const router = Router();

router.post(
    "/add",
    [
        check("nameHotel").not().isEmpty(),
        check("nameBedroom").not().isEmpty(),
        check("startDate").not().isEmpty(),
        check("endDate").not().isEmpty(),
        check("nameHotel").custom(existentHotel),
        check("nameBedroom").custom(notExistentBedName),
    ],addRent
    
);

router.get("/", 
    listRent
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