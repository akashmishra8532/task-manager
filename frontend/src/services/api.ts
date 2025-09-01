/**
 * API Service
 * Centralized API client using Axios for all backend communication
 * 
 * Features:
 * - Axios instance configuration
 * - Request/response interceptors
 * - Authentication token management
 * - Error handling
 * - Type-safe API calls
 */

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import {
  ApiResponse,
  AuthResponse,
  TasksResponse,
  Task,
  User,
  LoginForm,
  RegisterForm,
  ProfileForm,
  ChangePasswordForm,
  CreateTaskData,
  UpdateTaskData,
  TaskFilters,
  TaskStats
} from '../types';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    
    // Handle specific error cases
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Show error toast
    toast.error(message);
    
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  // Register new user
  register: async (formData: RegisterForm): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', formData);
    return response.data;
  },

  // Login user
  login: async (formData: LoginForm): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', formData);
    return response.data;
  },

  // Get current user profile
  getMe: async (): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.get<ApiResponse<{ user: User }>>('/auth/me');
    return response.data;
  },

  // Update user profile
  updateProfile: async (formData: ProfileForm): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.put<ApiResponse<{ user: User }>>('/auth/profile', formData);
    return response.data;
  },

  // Change password
  changePassword: async (formData: ChangePasswordForm): Promise<ApiResponse> => {
    const response = await api.put<ApiResponse>('/auth/password', formData);
    return response.data;
  },

  // Logout user
  logout: async (): Promise<ApiResponse> => {
    const response = await api.post<ApiResponse>('/auth/logout');
    return response.data;
  },
};

// Tasks API endpoints
export const tasksAPI = {
  // Get all tasks with optional filters
  getTasks: async (filters?: TaskFilters): Promise<ApiResponse<TasksResponse>> => {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }
    
    const response = await api.get<ApiResponse<TasksResponse>>(`/tasks?${params.toString()}`);
    return response.data;
  },

  // Get single task
  getTask: async (id: string): Promise<ApiResponse<{ task: Task }>> => {
    const response = await api.get<ApiResponse<{ task: Task }>>(`/tasks/${id}`);
    return response.data;
  },

  // Create new task
  createTask: async (taskData: CreateTaskData): Promise<ApiResponse<{ task: Task }>> => {
    const response = await api.post<ApiResponse<{ task: Task }>>('/tasks', taskData);
    return response.data;
  },

  // Update task
  updateTask: async (id: string, taskData: UpdateTaskData): Promise<ApiResponse<{ task: Task }>> => {
    const response = await api.put<ApiResponse<{ task: Task }>>(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete task
  deleteTask: async (id: string): Promise<ApiResponse> => {
    const response = await api.delete<ApiResponse>(`/tasks/${id}`);
    return response.data;
  },

  // Toggle task status
  toggleTaskStatus: async (id: string): Promise<ApiResponse<{ task: Task }>> => {
    const response = await api.patch<ApiResponse<{ task: Task }>>(`/tasks/${id}/toggle`);
    return response.data;
  },

  // Toggle task importance
  toggleTaskImportance: async (id: string): Promise<ApiResponse<{ task: Task }>> => {
    const response = await api.patch<ApiResponse<{ task: Task }>>(`/tasks/${id}/important`);
    return response.data;
  },

  // Get task statistics
  getTaskStats: async (): Promise<ApiResponse<TaskStats>> => {
    const response = await api.get<ApiResponse<TaskStats>>('/tasks/stats');
    return response.data;
  },
};

// Utility functions
export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  delete api.defaults.headers.common['Authorization'];
};

export default api;
