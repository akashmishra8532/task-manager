/**
 * Validation Utilities
 * Joi-based validation schemas for request validation
 * 
 * Features:
 * - User registration and login validation
 * - Task creation and update validation
 * - Custom error messages
 * - Input sanitization
 */

const Joi = require('joi');

/**
 * User registration validation schema
 */
const registerSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.min': 'Name must be at least 2 characters long',
      'string.max': 'Name cannot exceed 50 characters',
      'any.required': 'Name is required',
      'string.empty': 'Name cannot be empty'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty'
    })
});

/**
 * User login validation schema
 */
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty'
    })
});

/**
 * Task creation validation schema
 */
const createTaskSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.min': 'Task title cannot be empty',
      'string.max': 'Task title cannot exceed 100 characters',
      'any.required': 'Task title is required',
      'string.empty': 'Task title cannot be empty'
    }),
  description: Joi.string()
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Task description cannot exceed 500 characters'
    }),
  priority: Joi.string()
    .valid('low', 'medium', 'high')
    .default('medium')
    .messages({
      'any.only': 'Priority must be low, medium, or high'
    }),
  dueDate: Joi.date()
    .greater('now')
    .allow(null)
    .optional()
    .messages({
      'date.greater': 'Due date must be in the future'
    }),
  tags: Joi.array()
    .items(Joi.string().max(20))
    .max(10)
    .optional()
    .messages({
      'array.max': 'Cannot have more than 10 tags',
      'string.max': 'Tag cannot exceed 20 characters'
    }),
  isImportant: Joi.boolean()
    .default(false),
  notes: Joi.string()
    .max(1000)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Notes cannot exceed 1000 characters'
    })
});

/**
 * Task update validation schema
 */
const updateTaskSchema = Joi.object({
  title: Joi.string()
    .min(1)
    .max(100)
    .optional()
    .messages({
      'string.min': 'Task title cannot be empty',
      'string.max': 'Task title cannot exceed 100 characters',
      'string.empty': 'Task title cannot be empty'
    }),
  description: Joi.string()
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Task description cannot exceed 500 characters'
    }),
  status: Joi.string()
    .valid('pending', 'completed')
    .optional()
    .messages({
      'any.only': 'Status must be pending or completed'
    }),
  priority: Joi.string()
    .valid('low', 'medium', 'high')
    .optional()
    .messages({
      'any.only': 'Priority must be low, medium, or high'
    }),
  dueDate: Joi.date()
    .allow(null)
    .optional(),
  tags: Joi.array()
    .items(Joi.string().max(20))
    .max(10)
    .optional()
    .messages({
      'array.max': 'Cannot have more than 10 tags',
      'string.max': 'Tag cannot exceed 20 characters'
    }),
  isImportant: Joi.boolean()
    .optional(),
  notes: Joi.string()
    .max(1000)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Notes cannot exceed 1000 characters'
    })
});

/**
 * Task filter validation schema
 */
const taskFilterSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'completed')
    .optional()
    .messages({
      'any.only': 'Status must be pending or completed'
    }),
  priority: Joi.string()
    .valid('low', 'medium', 'high')
    .optional()
    .messages({
      'any.only': 'Priority must be low, medium, or high'
    }),
  isImportant: Joi.boolean()
    .optional(),
  search: Joi.string()
    .max(100)
    .optional()
    .messages({
      'string.max': 'Search term cannot exceed 100 characters'
    })
});

/**
 * Validate request data against a schema
 */
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errorMessages
      });
    }

    // Replace request body with validated data
    req.body = value;
    next();
  };
};

/**
 * Validate query parameters against a schema
 */
const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      return res.status(400).json({
        success: false,
        message: 'Invalid query parameters',
        errors: errorMessages
      });
    }

    // Replace request query with validated data
    req.query = value;
    next();
  };
};

module.exports = {
  registerSchema,
  loginSchema,
  createTaskSchema,
  updateTaskSchema,
  taskFilterSchema,
  validateRequest,
  validateQuery
};
