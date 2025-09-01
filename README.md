# Task Manager App - Full Stack Developer Assignment

## 📋 Project Overview

A modern, full-stack Task Manager application built for the Vexocore IT Services Full Stack Developer Internship assignment. This application demonstrates proficiency in both frontend and backend development with clean, maintainable code.

## 🚀 Features

### Core Features
- ✅ **User Authentication**: Secure JWT-based signup/login system
- ✅ **Task Management**: Create, read, update, delete tasks
- ✅ **Status Toggle**: Mark tasks as pending/completed
- ✅ **Database Storage**: Persistent data storage with MongoDB
- ✅ **Responsive Design**: Works on desktop, tablet, and mobile
- ✅ **Modern UI**: Clean, intuitive interface with Tailwind CSS

### Technical Features
- 🔐 **JWT Authentication**: Secure token-based authentication
- 📱 **Responsive Design**: Mobile-first approach
- 🎨 **Modern UI/UX**: Beautiful, intuitive interface
- 🗄️ **Database**: MongoDB with Mongoose ODM
- 🔄 **Real-time Updates**: Instant UI updates
- 📝 **Clean Code**: Well-documented, maintainable codebase

## 🏗️ Architecture

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
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript definitions
│   └── public/            # Static assets
└── docs/                  # Documentation
```

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Security**: bcrypt, helmet, cors

### Frontend
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + useReducer
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **Build Tool**: Vite

### Development Tools
- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Tasks
- `GET /api/tasks` - Get all tasks for user (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)
- `PATCH /api/tasks/:id/toggle` - Toggle task status (protected)

## 🎯 Key Code Features

### 1. Clean Component Structure
- Reusable components with clear responsibilities
- Proper TypeScript interfaces
- Consistent naming conventions

### 2. Secure Authentication
- JWT token management
- Protected routes
- Password hashing with bcrypt

### 3. Error Handling
- Comprehensive error handling
- User-friendly error messages
- Proper HTTP status codes

### 4. Database Design
- Efficient MongoDB schemas
- Proper indexing
- Data validation

## 🚀 Deployment

### Backend Deployment (Render)
1. Connect GitHub repository to Render
2. Set environment variables
3. Deploy automatically on push

### Frontend Deployment (Vercel)
1. Connect GitHub repository to Vercel
2. Configure build settings
3. Deploy automatically on push

## 📝 Code Quality

- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **TypeScript**: Type safety and better IDE support
- **Comments**: Clear, helpful code comments
- **Documentation**: Comprehensive README and inline docs

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional appearance
- **Responsive**: Works on all device sizes
- **Accessibility**: Keyboard navigation and screen reader support
- **Loading States**: Smooth loading indicators
- **Error States**: Clear error messages and recovery options

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt for password security
- **Input Validation**: Server-side validation
- **CORS**: Cross-origin resource sharing
- **Helmet**: Security headers

## 📊 Performance

- **Optimized Builds**: Vite for fast development
- **Code Splitting**: Lazy loading for better performance
- **Efficient Queries**: Optimized database queries
- **Caching**: Browser caching for static assets

## 🤝 Contributing

This project demonstrates:
- Clean, maintainable code
- Proper project structure
- Comprehensive documentation
- Modern development practices
- Security best practices

## 📞 Support

For questions about this implementation, the code is well-documented and follows industry best practices for easy understanding and explanation.

---

**Built with ❤️ for Vexocore IT Services Full Stack Developer Internship**
