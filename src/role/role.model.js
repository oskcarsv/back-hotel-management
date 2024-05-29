import mongoose from "mongoose";

const RoleSchema = mongoose.Schema({
  role: {
    type: String,
  },

  bedroomStatus: {
    type: String,
  },

  hotelStatus: {
    type: String,
  },

  rentStatus: {
    type: String
  }

});

export default mongoose.model("Role", RoleSchema);
