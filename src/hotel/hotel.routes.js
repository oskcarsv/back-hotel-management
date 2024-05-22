import { Router } from 'express'

import { check } from 'express-validator'

import {
  addHotel,
  deleteHotel,
  listHotel,
  getHotelById,
  updateHotel
} from '../hotel/hotel.controller.js'

import { notExistentBedNameArray } from '../helpers/db-validator.js'

import { validateJWT } from '../middleware/validate-jwt.js'

import { validateFields } from '../middleware/validate-fields.js'

import { haveRol } from '../middleware/validate-role.js'

const router = Router()

router.get('/',[

  validateJWT

], listHotel)

router.post(
  '/',
  [
    validateJWT,
    haveRol('SUPER_ROLE', 'ADMIN_EMPLOYEE_ROLE', 'ADMIN_BOSS_ROLE'),
    check('hotelName').not().isEmpty(),
    check('hotelDirection').not().isEmpty(),
    check('hotelNumber').not().isEmpty(),
    check('bedroomName').not().isEmpty(),
    check('bedroomCuantity').not().isEmpty(),
    check('bedroomName').custom(notExistentBedNameArray),
    validateFields
  ],
  addHotel
)

router.get('/get', [], listHotel)

router.get('/get/:id', [], getHotelById)

router.put(
  '/put/:id',
  [
    validateJWT,
    haveRol('SUPER_ROLE', 'ADMIN_EMPLOYEE_ROLE', 'ADMIN_BOSS_ROLE'),
    check('id', 'ID de hotel no válido').isMongoId()
    // check("id").custom(obtenerHotelPorId),
  ],
  updateHotel
)

router.delete(
  '/',
  [
    validateJWT,
    haveRol('SUPER_ROLE', 'ADMIN_EMPLOYEE_ROLE', 'ADMIN_BOSS_ROLE'),
    check('hotelName').not().isEmpty(),
    // check("hotelName").custom(existentHotel),
    validateFields
  ],
  deleteHotel
)

export default router
