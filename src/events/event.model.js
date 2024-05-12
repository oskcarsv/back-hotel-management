import mongoose from "mongoose";

const EventSchema = mongoose.Schema({

    title: {

        type: String,
        required: [true, "Title is required"]

    },

    description: {

        type: String,
        required: [true, "Description is required"]

    },

    date: {

        type: Date,
        required: [true, "Date is required"]

    },

    location: {

        type: String,
        required: [true, "Location is required"]

    },

    state: {

        type: Boolean,
        default: true

    }

});


export default mongoose.model('Event', EventSchema);