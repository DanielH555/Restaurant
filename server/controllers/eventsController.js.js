const Event = require('../models/eventModel');

// GET /events - Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// GET /events/:id - Get a specific event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// POST /events - Create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create event' });
  }
};

// PUT /events/:id - Update an existing event
exports.updateEvent = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // if (!event) {
    //   return res.status(404).json({ error: 'Event not found' });
    // }
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update event' });
  }
};

// DELETE /events/:id - Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete event' });
  }
};
