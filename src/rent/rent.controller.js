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
export const getRentList = async (req, res) => {
    const { } = req.params;
    
    try {
        const rentList = await Rent.find();
        res.status(200).json(rentList);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error when obtaining the list of income");
    }
};

export const getRentById = async (req, res) => {
    const { id } = req.params;
    try {
        const rent = await Rent.findById(id);
        if (!rent) {
            return res.status(404).send("Income not found");
        }
        res.status(200).json(rent);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error obtaining income by ID");
    }
};

export const updateRent = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedRent = await Rent.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRent) {
            return res.status(404).send("Income not found");
        }
        res.status(200).json({
            msg: "Rent successfully updated",
            updatedRent
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating income");
    }
};

export const deleteRent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRent = await Rent.findByIdAndDelete(id);
        if (!deletedRent) {
            return res.status(404).send("Income not found");
        }
        res.status(200).json({
            msg: "Income successfully removed",
            deletedRent
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error when deleting income");
    }
};

export default { addRent, getRentList, getRentById, updateRent, deleteRent };