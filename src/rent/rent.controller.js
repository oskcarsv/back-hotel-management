import Rent from './rent.model.js'

export const addRent = async (req, res) => {
  const { nameHotel, nameBedroom, startDate, endDate } = req.body

  const datePartsInitial = taskInitialDate.split(' ')
  const dateInitial = datePartsInitial[0]
  const timeInitial = datePartsInitial[1]
  const [dayInitial, monthInitial, yearInitial] = dateInitial.split('/')
  const isoDateInitial = `${yearInitial}-${monthInitial}-${dayInitial}T${timeInitial}:00.000Z`

  const datePartsEnd = taskEndDate.split(' ')
  const dateEnd = datePartsEnd[0]
  const timeEnd = datePartsEnd[1]
  const [dayEnd, monthEnd, yearEnd] = dateEnd.split('/')
  const isoDateEnd = `${yearEnd}-${monthEnd}-${dayEnd}T${timeEnd}:00.000Z`

  const rent = new Rent({
    nameClient: req.user.username,
    nameHotel,
    nameBedroom,
    startDate: isoDateInitial,
    endDate: isoDateEnd,
    status: 'RENT_IN_PROGRESS'
  })

  try {
    await rent.save()
    res.status(200).json({
      msg: `${req.user.username}, successfully registered income`
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error when registering income')
  }
}

export const listRent = async (req, res) => {
  const { limit, from } = req.query

  const [total, rent] = await Promise.all([
    Rent.countDocuments(),
    Rent.find().skip(Number(from)).limit(Number(limit))
  ])

  res.status(200).json({
    total,
    rent
  })
}

export const getRentById = async (req, res) => {
  const { id } = req.params
  try {
    const rent = await Rent.findById(id)
    if (!rent) {
      return res.status(404).send('Income not found')
    }
    res.status(200).json(rent)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error obtaining income by ID')
  }
}

export const updateRent = async (req, res) => {
  const { id } = req.params
  try {
    const updatedRent = await Rent.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if (!updatedRent) {
      return res.status(404).send('Income not found')
    }
    res.status(200).json({
      msg: 'Rent successfully updated',
      updatedRent
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error updating income')
  }
}

export const deleteRent = async (req, res) => {
  const { id } = req.params
  try {
    const deletedRent = await Rent.findByIdAndDelete(id)
    if (!deletedRent) {
      return res.status(404).send('Income not found')
    }
    res.status(200).json({
      msg: 'Income successfully removed',
      deletedRent
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error when deleting income')
  }
}
