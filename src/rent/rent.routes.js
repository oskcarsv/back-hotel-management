import express from 'express';
import * as RentController from './rent.controller.js';
import * as RentHelper from './rent.helper.js'; 
const router = express.Router();

router.post('/add', async (req, res) => {
    try {
        await RentHelper.existentUsername(req.body.nameClient);
        await RentHelper.existentHotel(req.body.nameHotel);

        if (Array.isArray(req.body.nameBedroom)) {
            await RentHelper.notExistentBedNameArray(req.body.nameBedroom);
        } else {
            await RentHelper.notExistentBedName(req.body.nameBedroom);
        }

        await RentController.addRent(req, res);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

export default router;