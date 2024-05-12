import Rent from './rent.model.js';

export const addRent = async (req, res) => {
    const { nameClient, nameHotel, nameBedroom, startDate, endDate, price } = req.body;
    
    const rent = new Rent({
        nameClient,
        nameHotel,
        nameBedroom,
        startDate,
        endDate,
        price
    });

    try {
        await rent.save();
        res.status(200).json({
            msg: `${req.user.username}, successfully registered income`
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error when registering income");
    }
};
