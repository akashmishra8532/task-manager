# Task Manager API Documentation

## 📋 Overview

The Task Manager API is a RESTful service built with Node.js, Express, and MongoDB. It provides endpoints for user authentication and task management.

**Base URL:** `http://localhost:5000/api`

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📊 Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## 🔑 Authentication Endpoints

### Register User

**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://via.placeholder.com/150/6366f1/ffffff?text=U",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

### Login User

**POST** `/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://via.placeholder.com/150/6366f1/ffffff?text=U",
      "lastLogin": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

### Get Current User

**GET** `/auth/me`

Get current user profile (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "avatar": "https://via.placeholder.com/150/6366f1/ffffff?text=U",
      "lastLogin": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### Update Profile

**PUT** `/auth/profile`

Update user profile (requires authentication).

**Request Body:**
```json
{
  "name": "John Smith",
  "avatar": "https://example.com/avatar.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Smith",
      "email": "john@example.com",
      "avatar": "https://example.com/avatar.jpg",
      "lastLogin": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### Change Password

**PUT** `/auth/password`

Change user password (requires authentication).

**Request Body:**
```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Logout

**POST** `/auth/logout`

Logout user (client-side token removal).

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## 📝 Task Endpoints

### Get All Tasks

**GET** `/tasks`

Get all tasks for the authenticated user.

**Query Parameters:**
- `status` (optional): Filter by status (`pending` or `completed`)
- `priority` (optional): Filter by priority (`low`, `medium`, `high`)
- `isImportant` (optional): Filter by importance (`true` or `false`)
- `search` (optional): Search in title and description

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": {
    "tasks": [
      {
        "id": "task_id",
        "title": "Complete assignment",
        "description": "Finish the task manager app",
        "status": "pending",
        "priority": "high",
        "dueDate": "2024-01-15T00:00:00.000Z",
        "completedAt": null,
        "user": "user_id",
        "tags": ["work", "urgent"],
        "isImportant": true,
        "notes": "Important deadline",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "statistics": {
      "total": 5,
      "completed": 2,
      "pending": 3,
      "important": 1
    }
  }
}
```

### Get Single Task

**GET** `/tasks/:id`

Get a specific task by ID (requires authentication).

**Response:**
```json
{
  "success": true,
  "data": {
    "task": {
      "id": "task_id",
      "title": "Complete assignment",
      "description": "Finish the task manager app",
      "status": "pending",
      "priority": "high",
      "dueDate": "2024-01-15T00:00:00.000Z",
      "completedAt": null,
      "user": "user_id",
      "tags": ["work", "urgent"],
      "isImportant": true,
      "notes": "Important deadline",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### Create Task

**POST** `/tasks`

Create a new task (requires authentication).

**Request Body:**
```json
{
  "title": "Complete assignment",
  "description": "Finish the task manager app",
  "priority": "high",
  "dueDate": "2024-01-15T00:00:00.000Z",
  "tags": ["work", "urgent"],
  "isImportant": true,
  "notes": "Important deadline"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "task": {
      "id": "task_id",
      "title": "Complete assignment",
      "description": "Finish the task manager app",
      "status": "pending",
      "priority": "high",
      "dueDate": "2024-01-15T00:00:00.000Z",
      "completedAt": null,
      "user": "user_id",
      "tags": ["work", "urgent"],
      "isImportant": true,
      "notes": "Important deadline",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### Update Task

**PUT** `/tasks/:id`

Update an existing task (requires authentication).

**Request Body:**
```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "status": "completed",
  "priority": "medium",
  "dueDate": "2024-01-20T00:00:00.000Z",
  "tags": ["work"],
  "isImportant": false,
  "notes": "Updated notes"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "task": {
      "id": "task_id",
      "title": "Updated task title",
      "description": "Updated description",
      "status": "completed",
      "priority": "medium",
      "dueDate": "2024-01-20T00:00:00.000Z",
      "completedAt": "2024-01-01T00:00:00.000Z",
      "user": "user_id",
      "tags": ["work"],
      "isImportant": false,
      "notes": "Updated notes",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### Delete Task

**DELETE** `/tasks/:id`

Delete a task (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Toggle Task Status

**PATCH** `/tasks/:id/toggle`

Toggle task status between pending and completed (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Task marked as completed",
  "data": {
    "task": {
      "id": "task_id",
      "title": "Complete assignment",
      "status": "completed",
      "completedAt": "2024-01-01T00:00:00.000Z",
      // ... other task fields
    }
  }
}
```

### Toggle Task Importance

**PATCH** `/tasks/:id/important`

Toggle task importance flag (requires authentication).

**Response:**
```json
{
  "success": true,
  "message": "Task marked as important",
  "data": {
    "task": {
      "id": "task_id",
      "title": "Complete assignment",
      "isImportant": true,
      // ... other task fields
    }
  }
}
```

### Get Task Statistics

**GET** `/tasks/stats`

Get task statistics for the authenticated user.

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 10,
    "completed": 6,
    "pending": 4,
    "important": 2,
    "overdue": 1,
    "completionRate": 60,
    "byPriority": {
      "high": 3,
      "medium": 4,
      "low": 3
    }
  }
}
```

## 🔍 Health Check

### Health Check

**GET** `/health`

Check if the API is running.

**Response:**
```json
{
  "status": "OK",
  "message": "Task Manager API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

## 🚨 Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

## 📝 Data Models

### User Model

```json
{
  "id": "string",
  "name": "string (2-50 characters)",
  "email": "string (valid email)",
  "password": "string (min 6 characters, hashed)",
  "avatar": "string (URL)",
  "isActive": "boolean",
  "lastLogin": "Date",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Task Model

```json
{
  "id": "string",
  "title": "string (1-100 characters)",
  "description": "string (max 500 characters)",
  "status": "enum (pending, completed)",
  "priority": "enum (low, medium, high)",
  "dueDate": "Date (optional)",
  "completedAt": "Date (optional)",
  "user": "ObjectId (reference to User)",
  "tags": "array of strings (max 10 tags, 20 chars each)",
  "isImportant": "boolean",
  "notes": "string (max 1000 characters)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## 🔒 Security

- **JWT Authentication**: All protected endpoints require valid JWT token
- **Password Hashing**: Passwords are hashed using bcrypt
- **Input Validation**: All inputs are validated using Joi
- **Rate Limiting**: API requests are rate limited
- **CORS**: Cross-origin requests are properly configured
- **Security Headers**: Helmet.js provides security headers

## 🧪 Testing

Use tools like Postman, Insomnia, or curl to test the API endpoints. Remember to:

1. Register a user first
2. Login to get a JWT token
3. Include the token in the Authorization header for protected endpoints
4. Test both successful and error scenarios

---

**API Version:** 1.0.0  
**Last Updated:** January 2024
