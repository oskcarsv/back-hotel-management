import mongoose from 'mongoose'

const BedroomSchema = mongoose.Schema({
  bedroomName: {
    type: String,
    required: [true, 'The Bedroom Name is required']
  },

  bedroomImage: {
    type: String,
    default:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOWvwTDIf-fxsYhef9fGrtpNCJUTgBYhOMuMipM7Dl8A&s'
  },

  bedroomPrize: {
    type: String,
    required: [true, 'The Bedroom Prize is required']
  },

  bedroomCapacity: {
    type: String,
    required: [true, 'The Bedroom capacity is required']
  },

  bed: {
    type: String,
    required: [true, 'The Bed is required']
  },

  status: {
    type: String,
    enum: ['NOT_USE', 'IN_USE', 'FINISH_USE', 'CANCEL'],
    default: 'NOT_USE'
  }
})

export default mongoose.model('Bedroom', BedroomSchema)
