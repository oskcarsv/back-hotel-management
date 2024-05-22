'use strict'

import bcryptjs from 'bcryptjs'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import authRoutes from '../src/auth/auth.routes.js'
import bedroomRoutes from '../src/bedroom/bedroom.routes.js'
import hotelRoutes from '../src/hotel/hotel.routes.js'
import Role from '../src/role/role.model.js'
import User from '../src/user/user.model.js'
import userRoutes from '../src/user/user.routes.js'
import eventRoutes from '../src/events/event.routes.js'
import rentRoutes from '../src/rent/rent.routes.js'
import { dbConnection } from './mongo.js'

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT
    this.authPath = '/hotel-management/v1/auth'
    this.userPath = '/hotel-management/v1/user'
    this.eventPath = '/hotel-management/v1/event'
    this.bedroomPath = '/hotel-management/v1/bedroom'
    this.hotelPath = '/hotel-management/v1/hotel'
    this.rentPath = '/hotel-management/v1/rent'

    this.middlewares()
    this.connectDB()
    this.defaultCredential()
    this.routes()
  }

  async defaultCredential () {
    const defaultCredentials = await User.findOne({ username: 'admin' })

    if (!defaultCredentials) {
      const defaultUser = new User({
        name: 'admin',
        username: 'admin',
        password: 'Admin10!',
        email: 'admin@gmail.com',
        role: 'SUPER_ROLE'
      })

      const salt = bcryptjs.genSaltSync()
      defaultUser.password = bcryptjs.hashSync(defaultUser.password, salt)

      await defaultUser.save()

      const SUPER_ROLE = new Role({ role: 'SUPER_ROLE' })
      const ADMIN_BOSS_ROLE = new Role({ role: 'ADMIN_BOSS_ROLE' })
      const ADMIN_EMPLOYEE_ROLE = new Role({ role: 'ADMIN_EMPLOYEE_ROLE' })
      const USER_ROLE = new Role({ role: 'USER_ROLE' })
      const NOT_USE = new Role({ bedroomStatus: 'NOT_USE' })
      const IN_USE = new Role({ bedroomStatus: 'IN_USE' })
      const FINISH_USE = new Role({ bedroomStatus: 'FINISH_USE' })
      const CANCEL = new Role({ bedroomStatus: 'CANCEL' })
      const ACTIVE = new Role({ hotelStatus: 'ACTIVE' })
      const MAINTENANCE = new Role({ hotelStatus: 'MAINTENANCE' })
      const CLOSED = new Role({ hotelStatus: 'CLOSED' })
      const RENT_IN_PROGRESS = new Role({ rentStatus: 'RENT_IN_PROGRESS' })
      const RENT_DONE = new Role({ rentStatus: 'RENT_DONE' })

      await SUPER_ROLE.save()
      await ADMIN_BOSS_ROLE.save()
      await ADMIN_EMPLOYEE_ROLE.save()
      await USER_ROLE.save()
      await NOT_USE.save()
      await IN_USE.save()
      await FINISH_USE.save()
      await CANCEL.save()
      await ACTIVE.save()
      await MAINTENANCE.save()
      await CLOSED.save()
      await RENT_IN_PROGRESS.save()
      await RENT_DONE.save()

      console.log('Default Credentials have been created.')
    } else {
      console.log('Default Credentials have already been created.')
    }
  }

  middlewares () {
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(helmet())
    this.app.use(morgan('dev'))
  }

  async connectDB () {
    await dbConnection()
  }

  routes () {
    this.app.use(this.authPath, authRoutes)
    this.app.use(this.userPath, userRoutes)
    this.app.use(this.eventPath, eventRoutes)

    this.app.use(this.bedroomPath, bedroomRoutes)
    this.app.use(this.hotelPath, hotelRoutes)
    this.app.use(this.rentPath, rentRoutes)
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('Server running on port: ', this.port)
    })
  }
}

export default Server
