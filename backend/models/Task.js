/**
 * Task Model
 * Mongoose schema for task management and organization
 * 
 * Features:
 * - Task creation, editing, and deletion
 * - Status tracking (pending/completed)
 * - User association (each task belongs to a user)
 * - Priority levels
 * - Due dates and reminders
 * - Timestamps for task creation and updates
 */

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a task title'],
    trim: true,
    maxlength: [100, 'Task title cannot be more than 100 characters'],
    minlength: [1, 'Task title cannot be empty']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Task description cannot be more than 500 characters'],
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    maxlength: 20
  }],
  isImportant: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot be more than 1000 characters']
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for task completion status
taskSchema.virtual('isCompleted').get(function() {
  return this.status === 'completed';
});

// Virtual for task overdue status
taskSchema.virtual('isOverdue').get(function() {
  if (!this.dueDate || this.status === 'completed') {
    return false;
  }
  return new Date() > this.dueDate;
});

// Virtual for days until due
taskSchema.virtual('daysUntilDue').get(function() {
  if (!this.dueDate) {
    return null;
  }
  const today = new Date();
  const dueDate = new Date(this.dueDate);
  const diffTime = dueDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Indexes for better query performance
taskSchema.index({ user: 1, status: 1 });
taskSchema.index({ user: 1, dueDate: 1 });
taskSchema.index({ user: 1, priority: 1 });
taskSchema.index({ user: 1, createdAt: -1 });
taskSchema.index({ status: 1, dueDate: 1 });

// Pre-save middleware to handle completion
taskSchema.pre('save', function(next) {
  // If status is being changed to completed and completedAt is not set
  if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
    this.completedAt = new Date();
  }
  
  // If status is being changed from completed to pending, clear completedAt
  if (this.isModified('status') && this.status === 'pending') {
    this.completedAt = null;
  }
  
  next();
});

// Instance method to toggle task status
taskSchema.methods.toggleStatus = function() {
  this.status = this.status === 'pending' ? 'completed' : 'pending';
  if (this.status === 'completed') {
    this.completedAt = new Date();
  } else {
    this.completedAt = null;
  }
  return this.save();
};

// Instance method to mark as important
taskSchema.methods.toggleImportant = function() {
  this.isImportant = !this.isImportant;
  return this.save();
};

// Static method to get tasks by user with filters
taskSchema.statics.getUserTasks = function(userId, filters = {}) {
  const query = { user: userId };
  
  // Apply filters
  if (filters.status) {
    query.status = filters.status;
  }
  
  if (filters.priority) {
    query.priority = filters.priority;
  }
  
  if (filters.isImportant !== undefined) {
    query.isImportant = filters.isImportant;
  }
  
  return this.find(query).sort({ 
    isImportant: -1, 
    dueDate: 1, 
    createdAt: -1 
  });
};

// Static method to get overdue tasks
taskSchema.statics.getOverdueTasks = function(userId) {
  return this.find({
    user: userId,
    status: 'pending',
    dueDate: { $lt: new Date() }
  }).sort({ dueDate: 1 });
};

// Static method to get today's tasks
taskSchema.statics.getTodayTasks = function(userId) {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  
  return this.find({
    user: userId,
    dueDate: {
      $gte: startOfDay,
      $lt: endOfDay
    }
  }).sort({ priority: -1, createdAt: -1 });
};

module.exports = mongoose.model('Task', taskSchema);
