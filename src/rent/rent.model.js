import mongoose from 'mongoose';

const RentSchema = mongoose.Schema({
    nameClient: {
        type: String,
        required: [true, "Customer name is required"]
    },
    nameHotel: {
        type: String,
        required: [true, "Hotel name is required"]
    },
    nameBedroom: {
        type: String,
        required: [true, "Room name is required"]
    },
    startDate: {
        type: Date,
        required: [true, "Rental start date is required"]
    },
    
    endDate: {
        type: Date,
        required: [true, "La fecha de fin del alquiler es requerida"]
    },
    status: {
        type: String,
        enum: ["RENT_IN_PROGESS", "RENT_DONE"],
        default: "Earring"
    }
});

export default mongoose.model('Rent', RentSchema);