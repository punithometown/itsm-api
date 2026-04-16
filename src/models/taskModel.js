const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO'
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM'
  },
  createdBy: String,
  assignedTo: String,
  comments: [commentSchema],
  due: {
    type: Date,
    default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
},

}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);