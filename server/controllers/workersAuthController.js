const Workers = require('../models/workerModel');

// GET /workers - Get all workers
exports.getAllWorkers = async (req, res) => {
  try {
    const events = await Workers.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// GET /workers/:id - Get a specific worker by ID
exports.getWorkerById = async (req, res) => {
  try {
    const event = await Workers.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch worker' });
  }
};

// POST /workers - Create a new worker
exports.createWorker = async (req, res) => {
  try {
    const event = new Workers(req.body);
    const createdWorker = await event.save();
    res.status(201).json(createdWorker);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create worker' });
  }
};

// PUT /workers/:id - Update an existing worker
exports.updateWorker = async (req, res) => {
  console.log(req.params.id);
  console.log(req.body);
  try {
    const worker = await Workers.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update worker' });
  }
};

// DELETE /worker/:id - Delete an worker
exports.deleteWorker = async (req, res) => {
  try {
    const event = await Workers.findByIdAndDelete(req.params.id);
    if (!worker) {
      return res.status(404).json({ error: 'Worker not found' });
    }
    res.json({ message: 'Worker deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete worker' });
  }
};
