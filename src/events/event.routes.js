import {Router} from 'express';

import {check} from 'express-validator';
import eventController from "./event.controller.js";
import { existentDate, existentDesc, existentLocation, existentTitle } from '../helpers/db-validator.js';
const router = Router();

router.post(
    '/',
    [
        check('title', "Title is required").not().isEmpty(),
        check('title').custom(existentTitle),
        check('description', "Description is required").not().isEmpty(),
        check('description').custom(existentDesc),
        check('date', "Date is required").not().isEmpty(),
        check('date').custom(existentDate),
        check('location', "Location is required").not().isEmpty(),
        check('location').custom(existentLocation)
    ],
    eventController.addEvent
);

router.put(
    '/:id',
    [
        check('title', "Title is required").not().isEmpty(),
        check('title').custom(existentTitle),
        check('description', "Description is required").not().isEmpty(),
        check('description').custom(existentDesc),
        check('date', "Date is required").not().isEmpty(),
        check('date').custom(existentDate),
        check('location', "Location is required").not().isEmpty(),
        check('location').custom(existentLocation)
    ],
    eventController.updateEvent
);

router.put(
    '/:id',
    eventController.cancelEvent
);

router.put(
    '/:id',
    [
        check('resources', "Resources are required").not().isEmpty()
    ],
    eventController.assignResources
);

export default router;