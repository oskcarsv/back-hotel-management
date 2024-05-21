import { Router } from 'express'

import { check } from 'express-validator'

import {
  createUser,
  listUsers,
  deleteUser,
  updateUser
} from '../user/user.controller.js'

import { validateJWT } from '../middleware/validate-jwt.js'

import {
  validateFields,
  validateRolCreate,
  validateRolDelete,
  validateRolUpdate,
  userActive
} from '../middleware/validate-fields.js'

import {
  existentEmail,
  existentUsername,
  existentRole,
  existentUserOrEmail
} from '../helpers/db-validator.js'

import { validationPassword } from '../helpers/data-validator.js'

import { haveRol } from '../middleware/validate-role.js'

const router = Router()

router.get('/', [validateJWT, userActive], listUsers)

router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required.').not().isEmpty(),
    check('username', 'username is required').not().isEmpty(),
    check('username').custom(existentUsername),
    check('password', 'Password must be greater than 6 characters.').isLength({
      min: 6
    }),
    check('password').custom(validationPassword),
    check('email', 'This is not a valid email.').isEmail(),
    check('email').custom(existentEmail),
    check('role').custom(existentRole),
    validateRolCreate,
    validateFields
  ],
  createUser
)

router.delete(
  '/',
  [
    validateJWT,
    check('usernameOrEmail').custom(existentUserOrEmail),
    validateRolDelete,
    validateFields
  ],
  deleteUser
)

router.put(
  '/',
  [
    validateJWT,
    // validateRolUpdate,
    validateFields
  ],
  updateUser
)

export default router
