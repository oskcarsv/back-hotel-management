import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },

  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },

  password: {
    type: String,
    required: [true, 'Password is required']
  },

  role: {
    type: String,
    required: true,
    default: 'SUPER_ROLE',
    enum: ['SUPER_ROLE', 'ADMIN_BOSS_ROLE', 'ADMIN_EMPLOYEE_ROLE', 'USER_ROLE']
  },

  state: {
    type: Boolean,
    default: true
  }
})

export default mongoose.model('User', UserSchema)
