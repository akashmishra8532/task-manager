/**
 * Task Context
 * React Context for managing task state and operations
 * 
 * Features:
 * - Task state management
 * - CRUD operations for tasks
 * - Task filtering and search
 * - Task statistics
 * - Loading states
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { tasksAPI } from '../services/api';
import { TaskContextType, Task, CreateTaskData, UpdateTaskData, TaskFilters, TaskStats } from '../types';

// Action types
type TaskAction =
  | { type: 'TASKS_LOADING' }
  | { type: 'TASKS_SUCCESS'; payload: { tasks: Task[]; stats: TaskStats | null } }
  | { type: 'TASKS_FAILURE' }
  | { type: 'CREATE_TASK_SUCCESS'; payload: Task }
  | { type: 'UPDATE_TASK_SUCCESS'; payload: Task }
  | { type: 'DELETE_TASK_SUCCESS'; payload: string }
  | { type: 'TOGGLE_STATUS_SUCCESS'; payload: Task }
  | { type: 'TOGGLE_IMPORTANCE_SUCCESS'; payload: Task }
  | { type: 'SET_FILTERS'; payload: TaskFilters }
  | { type: 'CLEAR_FILTERS' }
  | { type: 'GET_STATS_SUCCESS'; payload: TaskStats };

// State interface
interface TaskState {
  tasks: Task[];
  stats: TaskStats | null;
  isLoading: boolean;
  filters: TaskFilters;
}

// Initial state
const initialState: TaskState = {
  tasks: [],
  stats: null,
  isLoading: false,
  filters: {},
  isInitialized: false, // Add flag to prevent multiple initial loads
};

// Reducer function
const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'TASKS_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload.tasks,
        stats: action.payload.stats,
        isLoading: false,
        isInitialized: true,
      };
    case 'TASKS_FAILURE':
      return {
        ...state,
        isLoading: false,
      };
    case 'CREATE_TASK_SUCCESS':
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case 'UPDATE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case 'TOGGLE_STATUS_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'TOGGLE_IMPORTANCE_SUCCESS':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.payload,
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {},
      };
    case 'GET_STATS_SUCCESS':
      return {
        ...state,
        stats: action.payload,
      };
    default:
      return state;
  }
};

// Create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider component
interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Get tasks with filters
  const getTasks = async (filters?: TaskFilters): Promise<void> => {
    try {
      // Prevent multiple simultaneous requests
      if (state.isLoading) {
        return;
      }
      
      dispatch({ type: 'TASKS_LOADING' });
      
      const response = await tasksAPI.getTasks(filters || state.filters);
      if (response.success && response.data) {
        dispatch({
          type: 'TASKS_SUCCESS',
          payload: { tasks: response.data.tasks, stats: null },
        });
      } else {
        throw new Error(response.message || 'Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Get tasks error:', error);
      dispatch({ type: 'TASKS_FAILURE' });
      throw error;
    }
  };

  // Create task
  const createTask = async (taskData: CreateTaskData): Promise<void> => {
    try {
      const response = await tasksAPI.createTask(taskData);
      if (response.success && response.data) {
        dispatch({ type: 'CREATE_TASK_SUCCESS', payload: response.data.task });
        toast.success('Task created successfully!');
      } else {
        throw new Error(response.message || 'Failed to create task');
      }
    } catch (error) {
      console.error('Create task error:', error);
      throw error;
    }
  };

  // Update task
  const updateTask = async (id: string, taskData: UpdateTaskData): Promise<void> => {
    try {
      const response = await tasksAPI.updateTask(id, taskData);
      if (response.success && response.data) {
        dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: response.data.task });
        toast.success('Task updated successfully!');
      } else {
        throw new Error(response.message || 'Failed to update task');
      }
    } catch (error) {
      console.error('Update task error:', error);
      throw error;
    }
  };

  // Delete task
  const deleteTask = async (id: string): Promise<void> => {
    try {
      const response = await tasksAPI.deleteTask(id);
      if (response.success) {
        dispatch({ type: 'DELETE_TASK_SUCCESS', payload: id });
        toast.success('Task deleted successfully!');
      } else {
        throw new Error(response.message || 'Failed to delete task');
      }
    } catch (error) {
      console.error('Delete task error:', error);
      throw error;
    }
  };

  // Toggle task status
  const toggleTaskStatus = async (id: string): Promise<void> => {
    try {
      const response = await tasksAPI.toggleTaskStatus(id);
      if (response.success && response.data) {
        dispatch({ type: 'TOGGLE_STATUS_SUCCESS', payload: response.data.task });
        const status = response.data.task.status === 'completed' ? 'completed' : 'pending';
        toast.success(`Task marked as ${status}!`);
      } else {
        throw new Error(response.message || 'Failed to toggle task status');
      }
    } catch (error) {
      console.error('Toggle task status error:', error);
      throw error;
    }
  };

  // Toggle task importance
  const toggleTaskImportance = async (id: string): Promise<void> => {
    try {
      const response = await tasksAPI.toggleTaskImportance(id);
      if (response.success && response.data) {
        dispatch({ type: 'TOGGLE_IMPORTANCE_SUCCESS', payload: response.data.task });
        const importance = response.data.task.isImportant ? 'important' : 'not important';
        toast.success(`Task marked as ${importance}!`);
      } else {
        throw new Error(response.message || 'Failed to toggle task importance');
      }
    } catch (error) {
      console.error('Toggle task importance error:', error);
      throw error;
    }
  };

  // Get task statistics
  const getTaskStats = async (): Promise<void> => {
    try {
      // Prevent multiple simultaneous requests
      if (state.isLoading) {
        return;
      }
      
      const response = await tasksAPI.getTaskStats();
      if (response.success && response.data) {
        dispatch({ type: 'GET_STATS_SUCCESS', payload: response.data });
      } else {
        throw new Error(response.message || 'Failed to fetch task statistics');
      }
    } catch (error) {
      console.error('Get task stats error:', error);
      throw error;
    }
  };

  // Set filters
  const setFilters = (filters: TaskFilters): void => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  // Clear filters
  const clearFilters = (): void => {
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  // Context value
  const value: TaskContextType = {
    tasks: state.tasks,
    stats: state.stats,
    isLoading: state.isLoading,
    filters: state.filters,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    toggleTaskImportance,
    getTaskStats,
    setFilters,
    clearFilters,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

// Custom hook to use task context
export const useTask = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
