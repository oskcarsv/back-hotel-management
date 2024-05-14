import Hotel from './hotel.model.js';

export const addHotel = async (req, res) => {
    
    const { hotelName, hotelDirection, hotelNumber, bedroomName, bedroomCuantity } = req.body;
    
    const hotel = new Hotel({

        hotelName,
        hotelDirection,
        hotelNumber,
        bedroomName,
        bedroomCuantity

    });

    await hotel.save();

    res.status(200).json({

        msg: `${req.user.username} you successfully regist the hotel.`

    })

}
export const getHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel.findById(id);
        if (!hotel) {
            return res.status(404).send("Hotel not found");
        }
        return res.status(200).json(hotel);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error getting hotel by ID");
    }
};


export const listHotel = async (req, res) => {
    
    const {limit, from} = req.query;

    const query = {status: "ACTIVE"};

    const [total,hotel] = await Promise.all([

        Hotel.countDocuments(query),
        Hotel.find(query)
            .skip(Number(from))
            .limit(Number(limit))

    ]);

    res.status(200).json({

        total,
        hotel

    })

}

export const updateHotel = async (req, res) => {
    try {
        const { hotelName, hotelDirection, hotelNumber, bedroomName, bedroomCuantity, status } = req.body;
        const { id } = req.params;

        const hotel = await Hotel.findById(id);

        if (!hotel) {
            return res.status(404).json({ msg: "Hotel not found" });
        }

        if (hotelName) hotel.hotelName = hotelName;
        if (hotelDirection) hotel.hotelDirection = hotelDirection;
        if (hotelNumber) hotel.hotelNumber = hotelNumber;
        if (bedroomName) hotel.bedroomName = bedroomName;
        if (bedroomCuantity) hotel.bedroomCuantity = bedroomCuantity;
        if (status) hotel.status = status;

        await hotel.save();

        return res.status(200).json({
            msg: "Successfully updated hotel",
            hotel
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error updating hotel");
    }
};

export const deleteHotel = async(req, res) =>{

    const {hotelName} = req.body;

    await Hotel.findOneAndUpdate({ hotelName }, { status: "CLOSED" });

    const Hotel = await Hotel.findOne({hotelName});

    res.status(200).json({

        msg: `${req.user.username} you close the hotel successfully.`
        
    })

}