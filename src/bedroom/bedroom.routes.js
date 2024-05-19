import { Router } from 'express'

import { check } from 'express-validator'

import {
  addBedroom,
  deleteBedroom,
  listBedroom,
  updateBedroom,
  showAllRooms,
  getRoomById
} from '../bedroom/bedroom.controller.js'

import {
  existentBedName,
  notExistentBedName
} from '../helpers/db-validator.js'

import { validateJWT } from '../middleware/validate-jwt.js'

import { validateFields } from '../middleware/validate-fields.js'

import { haveRol } from '../middleware/validate-role.js'

const router = Router()

router.get('/', listBedroom)

router.post(
  '/',
  [
    validateJWT,
    haveRol('SUPER_ROLE', 'ADMIN_EMPLOYEE_ROLE', 'ADMIN_BOSS_ROLE'),
    check('bedroomName').not().isEmpty(),
    check('bedroomName').custom(existentBedName),
    check('bedroomPrize').not().isEmpty(),
    check('bedroomCapacity').not().isEmpty(),
    check('bed').not().isEmpty(),
    validateFields
  ],
  addBedroom
)
router.get('/get', [], listBedroom)

router.get('/get', [], showAllRooms)

router.get('/get/:id', [], getRoomById)

router.put(
  '/',
  [
    validateJWT,
    haveRol('SUPER_ROLE', 'ADMIN_EMPLOYEE_ROLE', 'ADMIN_BOSS_ROLE'),
    check('findBedroomName').not().isEmpty(),
    check('findBedroomName').custom(notExistentBedName),
    validateFields
  ],
  updateBedroom
)

router.delete(
  '/',
  [
    validateJWT,
    haveRol('SUPER_ROLE', 'ADMIN_EMPLOYEE_ROLE', 'ADMIN_BOSS_ROLE'),
    check('bedroomName').not().isEmpty(),
    check('bedroomName').custom(existentBedName),
    validateFields
  ],
  deleteBedroom
)

export default router
