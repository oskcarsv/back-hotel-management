import mongoose from 'mongoose';

const HotelSchema = mongoose.Schema({

    hotelName: {

        type: String,
        required: [true, "The Hotel name is required"]

    },

    hotelDirection: {

        type: String,
        required: [true, "The Hotel Direction is required"]

    },

    hotelNumber: {

        type: String,
        required: [true, "The Hotel Number is required"]

    },

    bedroomName: {

        type: [String]

    },

    bedroomCuantity: {

        type: Number

    },

    status: {

        type: String,
        enum: ["ACTIVE", "MAINTENANCE", "CLOSED"],
        default: "ACTIVE"

    }

});


export default mongoose.model('Hotel', HotelSchema);