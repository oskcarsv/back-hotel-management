import Bedroom from './bedroom.model.js';

export const addBedroom = async (req, res) =>{

    const {bedroomName, bedroomPrize, bedroomCapacity, bed} = req.body;

    const bedroom = new Bedroom({

        bedroomName,
        bedroomPrize,
        bedroomCapacity,
        bed

    });

    await bedroom.save();

    res.status(200).json({

        msg: `${req.user.username} you successfully regist the bedroom.`

    })

}

export const listBedroom = async(req, res) =>{

    const {limit, from} = req.query;

    const query = {status: { $ne:"CANCEL"}};

    const [total,bedroom] = await Promise.all([

        Bedroom.countDocuments(query),
        Bedroom.find(query)
            .skip(Number(from))
            .limit(Number(limit))

    ]);

    res.status(200).json({

        total,
        bedroom

    })
}
export const showAllRooms = async (req, res) => {
    try {
        const bedroom = await Bedroom.find();

        if (!bedroom || bedroom.length === 0) {
            return res.status(404).json({ msg: "No rooms found" });
        }

        return res.status(200).json({
            msg: "List of all rooms",
            bedroom
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error getting rooms");
    }
};

export const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const bedroom = await Bedroom.findById(id);
        if (!bedroom) {
            return res.status(404).send("Room not found");
        }
        return res.status(200).json(bedroom);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error getting room by ID");
    }
};


export const updateBedroom = async (req, res) =>{

    const { _id, state, ...rest } = req.body;

    const {findBedroomName} = req.body;

    await Bedroom.findOneAndUpdate({bedroomName: findBedroomName}, rest);

    const bedroom = await Bedroom.findOne({ bedroomName: findBedroomName });

    res.status(200).json({

        msg: `${req.user.username} the bedroom was successfully update :)`

    });

}

export const deleteBedroom = async(req, res) =>{

    const {bedroomName} = req.body;

    await Bedroom.findOneAndUpdate({bedroomName: bedroomName}, {status: "CANCEL"});

    const bedroom = await Bedroom.findOne({bedroomName: bedroomName});

    res.status(200).json({

        msg: `${req.user.username} your delete the bedroom successfully.`
        
    })

}