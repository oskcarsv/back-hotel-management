import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({

    role: {

        type: String,
        required: [true, "Role is required"],
        unique: true

    },

    bedroomStatus: {
        type: String,
        required: [true, "Bedroom Status is required"],
        unique: true
    }

});

export default mongoose.model('Role', RoleSchema);