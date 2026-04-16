const Task = require('../models/taskModel');

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, code: 201, data: task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LIST TASKS (FILTER + PAGINATION)
exports.getTasks = async (req, res) => {
  try {
    const { status, assignedTo, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (assignedTo) filter.assignedTo = assignedTo;

    const tasks = await Task.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ success: true,code:200, data: tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, code:200, data: task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ASSIGN TASK
exports.assignTask = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { assignedTo : assignedTo },
      { new: true }
    );

    res.json({ success: true,code:200, data: task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD COMMENT
exports.addComment = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { userId, message } } },
      { new: true }
    );

    res.json({ success: true, code:200,data: task });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};