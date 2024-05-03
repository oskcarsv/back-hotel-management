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

export const deleteHotel = async(req, res) =>{

    const {hotelName} = req.body;

    await Hotel.findOneAndUpdate({ hotelName }, { status: "CLOSED" });

    const hotel = await Hotel.findOne({hotelName});

    res.status(200).json({

        msg: `${req.user.username} you close the hotel successfully.`
        
    })

}