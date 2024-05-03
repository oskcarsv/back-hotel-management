import mongoose from 'mongoose';

const HotelSchema = mongoose.Schema({

    hotelName: {

        type: String,
        required: [true, "The Hotel name is required"]

    },

    hotelDirection: {

        type: String,
        required: [true, "The Hotel Dirction is required"]

    },

    hotelNumber: {

        type: String,
        required: [true, "The Hotel Number is required"]

    },

    bedroomName: {

        type: [String]

    }

});

export default mongoose.model('Hotel', HotelSchema);