import Hotel from './hotel.model.js';

export const addHotel = async (req, res) => {
    
    const { hotelName, hotelDirection, hotelNumber, bedroomName } = req.body;
    
    const hotel = new Hotel({

        hotelName,
        hotelDirection,
        hotelNumber,
        bedroomName
        
    });

    await hotel.save();

    res.status(200).json({

        msg: `${req.user.username} you successfully regist the hotel.`

    })

}