import Event from './event.model.js'

const eventController = {
  addEvent: async (req, res) => {
    try {
      const { title, description, date, location } = req.body
      const newEvent = new Event({
        title,
        description,
        date,
        location
      })
      await newEvent.save()
      res
        .status(201)
        .json({ message: 'Event added correctly', event: newEvent })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  updateEvent: async (req, res) => {
    try {
      const eventId = req.params.id
      const { title, description, date, location } = req.body
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        { title, description, date, location },
        { new: true }
      )
      res.json({ message: 'Event updated correctly', event: updatedEvent })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  cancelEvent: async (req, res) => {
    try {
      const eventId = req.params.id
      const canceledEvent = await Event.findByIdAndUpdate(
        eventId,
        { state: false },
        { new: true }
      )
      res.json({ message: 'a', event: canceledEvent })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  assignResources: async (req, res) => {
    try {
      const eventId = req.params.id
      const { resources } = req.body
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        { $push: { resources } },
        { new: true }
      )
      res.json({ message: 'Resources added correctly', event: updatedEvent })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

export default eventController
