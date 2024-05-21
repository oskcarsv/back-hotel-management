import bcryptjs from 'bcryptjs'

import User from './user.model.js'

export const createUser = async (req, res) => {
  let userRole = ''

  if (req.user.role === 'USER_ROLE') {
    const { name, username, email, password } = req.body

    const user = new User({
      name,
      username,
      email,
      password,
      role: 'USER_ROLE'
    })

    const salt = bcryptjs.genSaltSync()

    user.password = bcryptjs.hashSync(password, salt)

    await user.save()

    res.status(200).json({
      msg: `${req.user.username} you successfully created the profile of ${user.username}`
    })
  } else {
    const { name, username, email, password, role } = req.body

    if (role == '' || role == null) {
      userRole = 'USER_ROLE'
    } else {
      userRole = role
    }

    const user = new User({
      name,
      username,
      email,
      password,
      role: userRole
    })

    const salt = bcryptjs.genSaltSync()

    user.password = bcryptjs.hashSync(password, salt)

    await user.save()

    res.status(200).json({
      msg: `${req.user.username} you successfully created the profile of ${user.username}`
    })
  }
}

export const listUsers = async (req, res = response) => {

  if (req.user.role === 'USER_ROLE') {

    const { limit, from } = req.query

    const query = {state: true, username: req.user.username}

    const [total, user] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(Number(from)).limit(Number(limit))
    ])

    res.status(200).json({
      msg: `${req.user.username} your profile:`,
      user
    })    

  }else{

    const { limit, from } = req.query

    const query = { state: true }

    const [total, user] = await Promise.all([
      User.countDocuments(query),
      User.find(query).skip(Number(from)).limit(Number(limit))
    ])

    res.status(200).json({
      total,
      user
    })

  }
}

export const deleteUser = async (req, res = response) => {
  if (req.user.role === 'USER_ROLE') {
    const id = req.user._id

    await User.findByIdAndUpdate(id, { state: false })

    const user = await User.findOne({ _id: id })

    res.status(200).json({
      msg: `${req.user.username} your profile was delete successfully.`
    })
  } else {
    const { usernameOrEmail } = req.body

    if (usernameOrEmail.includes('@')) {
      await User.findOneAndUpdate({ email: usernameOrEmail }, { state: false })

      const user = await User.findOne({ email: usernameOrEmail })

      res.status(200).json({
        msg: `${req.user.username} the profile ${user.email} was successfully delete.`
      })
    } else {
      await User.findOneAndUpdate(
        { username: usernameOrEmail },
        { state: false }
      )

      const user = await User.findOne({ username: usernameOrEmail })

      res.status(200).json({
        msg: `${req.user.username} the profile ${user.email} was successfully delete.`
      })
    }
  }
}

export const updateUser = async (req, res) => {
  if (req.user.role === 'USER_ROLE') {
    const id = req.user._id

    const { _id, state, ...rest } = req.body

    await User.findByIdAndUpdate(id, rest)

    const user = await User.findOne({ _id: id })

    const { password } = req.body

    if (password != null) {
      const salt = bcryptjs.genSaltSync()

      user.password = bcryptjs.hashSync(password, salt)

      await user.save()
    }

    res.status(200).json({
      msg: `${req.user.username} your profile was successfully update :)`
    })
  } else {
    const { usernameOrEmail } = req.body

    if (usernameOrEmail == '' || usernameOrEmail == null) {
      const id = req.user._id

      const { _id, state, ...rest } = req.body

      await User.findByIdAndUpdate(id, rest)

      const user = await User.findOne({ _id: id })

      const { password } = req.body

      if (password != null) {
        const salt = bcryptjs.genSaltSync()

        user.password = bcryptjs.hashSync(password, salt)

        await user.save()
      }

      res.status(200).json({
        msg: `${req.user.username} your profile was successfully update :)`
      })
    } else {
      if (req.user.role == 'SUPER_ROLE') {
        const { _id, state, ...rest } = req.body

        if (usernameOrEmail.includes('@')) {
          await User.findOneAndUpdate({ email: usernameOrEmail }, rest)

          const user = await User.findOne({ email: usernameOrEmail })

          const { password } = req.body

          if (password != null) {
            const salt = bcryptjs.genSaltSync()

            user.password = bcryptjs.hashSync(password, salt)

            await user.save()
          }

          res.status(200).json({
            msg: `${req.user.username} you update successfully the profile ${user.username}`
          })
        } else {
          await User.findOneAndUpdate({ username: usernameOrEmail }, rest)

          const user = await User.findOne({ username: usernameOrEmail })

          const { password } = req.body

          if (password != null) {
            const salt = bcryptjs.genSaltSync()

            user.password = bcryptjs.hashSync(password, salt)

            await user.save()
          }

          res.status(200).json({
            msg: `${req.user.username} you update successfully the profile ${user.username}`
          })
        }
      } else {
        const { _id, state, role, ...rest } = req.body

        if (usernameOrEmail.includes('@')) {
          await User.findOneAndUpdate({ email: usernameOrEmail }, rest)

          const user = await User.findOne({ email: usernameOrEmail })

          const { password } = req.body

          if (password != null) {
            const salt = bcryptjs.genSaltSync()

            user.password = bcryptjs.hashSync(password, salt)

            await user.save()
          }

          res.status(200).json({
            msg: `${req.user.username} you update successfully the profile ${user.username}`
          })
        } else {
          await User.findOneAndUpdate({ username: usernameOrEmail }, rest)

          const user = await User.findOne({ username: usernameOrEmail })

          const { password } = req.body

          if (password != null) {
            const salt = bcryptjs.genSaltSync()

            user.password = bcryptjs.hashSync(password, salt)

            await user.save()
          }

          res.status(200).json({
            msg: `${req.user.username} you update successfully the profile ${user.username}`
          })
        }
      }
    }
  }
}
