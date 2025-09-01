# Task Manager App - Setup Guide

## 🚀 Quick Start

This guide will help you set up and run the Task Manager application locally.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (free tier)
- **Git**

## 🗄️ Database Setup

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new cluster (free tier)
3. Create a database user with read/write permissions
4. Get your connection string
5. Add your IP address to the IP whitelist

### 2. Environment Configuration

1. Copy the environment example file:
   ```bash
   cd backend
   cp env.example .env
   ```

2. Update the `.env` file with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
   ```

## 🔧 Backend Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The backend will start on `http://localhost:5000`

### 3. Verify Backend

Visit `http://localhost:5000/health` to verify the server is running.

## 🎨 Frontend Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🧪 Testing the Application

### 1. Register a New Account

1. Visit `http://localhost:3000/register`
2. Fill in your details and create an account
3. You'll be automatically logged in and redirected to the dashboard

### 2. Create Your First Task

1. Click "Add Task" on the dashboard
2. Fill in the task details
3. Click "Create Task"

### 3. Test Task Management

- ✅ Mark tasks as complete/incomplete
- 📝 Edit task details
- 🗑️ Delete tasks
- 🔍 Filter tasks by status and priority

## 🚀 Deployment

### Backend Deployment (Render)

1. Push your code to GitHub
2. Connect your repository to Render
3. Set environment variables in Render dashboard
4. Deploy automatically

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure build settings
4. Deploy automatically

## 🔍 API Testing

### Using Postman or Similar

1. **Register User**
   ```
   POST http://localhost:5000/api/auth/register
   Content-Type: application/json
   
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```

2. **Login**
   ```
   POST http://localhost:5000/api/auth/login
   Content-Type: application/json
   
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```

3. **Create Task** (with auth token)
   ```
   POST http://localhost:5000/api/tasks
   Authorization: Bearer YOUR_JWT_TOKEN
   Content-Type: application/json
   
   {
     "title": "Complete assignment",
     "description": "Finish the task manager app",
     "priority": "high"
   }
   ```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify your connection string
   - Check if your IP is whitelisted
   - Ensure database user has correct permissions

2. **JWT Token Issues**
   - Make sure JWT_SECRET is set in environment
   - Check token expiration

3. **CORS Errors**
   - Verify frontend URL in backend CORS configuration
   - Check if both servers are running

4. **Port Already in Use**
   - Change ports in configuration files
   - Kill existing processes using the ports

### Getting Help

- Check the console for error messages
- Verify all environment variables are set
- Ensure all dependencies are installed
- Check network connectivity

## 📝 Development Notes

### Code Structure

```
task-manager-app/
├── backend/                 # Node.js + Express API
│   ├── controllers/        # Business logic
│   ├── models/            # Database models
│   ├── routes/            # API endpoints
│   ├── middleware/        # Custom middleware
│   └── config/            # Configuration files
├── frontend/              # React + TypeScript
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── contexts/      # React contexts
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript definitions
│   └── public/            # Static assets
└── docs/                  # Documentation
```

### Key Features Implemented

- ✅ User authentication (JWT)
- ✅ Task CRUD operations
- ✅ Task status toggling
- ✅ Priority management
- ✅ Responsive design
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Modern UI/UX

### Security Features

- 🔐 JWT authentication
- 🔒 Password hashing (bcrypt)
- 🛡️ Input validation
- 🚫 Rate limiting
- 🔒 CORS protection
- 🛡️ Security headers (helmet)

## 🎯 Next Steps

1. **Add more features:**
   - Task categories/tags
   - Due date reminders
   - Task sharing
   - Advanced filtering

2. **Improve UI/UX:**
   - Dark mode
   - Drag and drop
   - Keyboard shortcuts
   - Mobile app

3. **Add testing:**
   - Unit tests
   - Integration tests
   - E2E tests

4. **Performance optimization:**
   - Caching
   - Pagination
   - Lazy loading

---

**Happy coding! 🚀**
