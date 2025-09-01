/**
 * Task Routes
 * API endpoints for task management
 * 
 * Routes:
 * - GET / - Get all tasks for user
 * - GET /:id - Get single task
 * - POST / - Create new task
 * - PUT /:id - Update task
 * - DELETE /:id - Delete task
 * - PATCH /:id/toggle - Toggle task status
 * - PATCH /:id/important - Toggle task importance
 * - GET /stats - Get task statistics
 */

const express = require('express');
const router = express.Router();

// Import controllers
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  toggleTaskImportance,
  getTaskStats
} = require('../controllers/taskController');

// Import middleware
const { protect } = require('../middleware/auth');
const { 
  validateRequest, 
  validateQuery,
  createTaskSchema, 
  updateTaskSchema, 
  taskFilterSchema 
} = require('../utils/validation');

// Apply authentication middleware to all routes
router.use(protect);

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks for current user
 * @access  Private
 */
router.get('/', validateQuery(taskFilterSchema), getTasks);

/**
 * @route   GET /api/tasks/stats
 * @desc    Get task statistics
 * @access  Private
 */
router.get('/stats', getTaskStats);

/**
 * @route   GET /api/tasks/:id
 * @desc    Get single task
 * @access  Private
 */
router.get('/:id', getTask);

/**
 * @route   POST /api/tasks
 * @desc    Create new task
 * @access  Private
 */
router.post('/', validateRequest(createTaskSchema), createTask);

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update task
 * @access  Private
 */
router.put('/:id', validateRequest(updateTaskSchema), updateTask);

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete task
 * @access  Private
 */
router.delete('/:id', deleteTask);

/**
 * @route   PATCH /api/tasks/:id/toggle
 * @desc    Toggle task status (pending/completed)
 * @access  Private
 */
router.patch('/:id/toggle', toggleTaskStatus);

/**
 * @route   PATCH /api/tasks/:id/important
 * @desc    Toggle task importance
 * @access  Private
 */
router.patch('/:id/important', toggleTaskImportance);

module.exports = router;
