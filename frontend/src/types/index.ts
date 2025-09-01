/**
 * TypeScript Type Definitions
 * Centralized type definitions for the Task Manager application
 */

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser extends User {
  token: string;
}

// Task related types
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  completedAt?: string;
  user: string;
  tags: string[];
  isImportant: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags?: string[];
  isImportant?: boolean;
  notes?: string;
}

export interface UpdateTaskData extends Partial<CreateTaskData> {
  status?: 'pending' | 'completed';
}

// Task filters
export interface TaskFilters {
  status?: 'pending' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  isImportant?: boolean;
  search?: string;
}

// Task statistics
export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  important: number;
  overdue: number;
  completionRate: number;
  byPriority: {
    high: number;
    medium: number;
    low: number;
  };
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
  count?: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface TasksResponse {
  tasks: Task[];
  statistics: {
    total: number;
    completed: number;
    pending: number;
    important: number;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface ProfileForm {
  name: string;
  avatar?: string;
}

export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
}

// Context types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (formData: LoginForm) => Promise<void>;
  register: (formData: RegisterForm) => Promise<void>;
  logout: () => void;
  updateProfile: (formData: ProfileForm) => Promise<void>;
  changePassword: (formData: ChangePasswordForm) => Promise<void>;
}

export interface TaskContextType {
  tasks: Task[];
  stats: TaskStats | null;
  isLoading: boolean;
  filters: TaskFilters;
  getTasks: (filters?: TaskFilters) => Promise<void>;
  createTask: (taskData: CreateTaskData) => Promise<void>;
  updateTask: (id: string, taskData: UpdateTaskData) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  toggleTaskStatus: (id: string) => Promise<void>;
  toggleTaskImportance: (id: string) => Promise<void>;
  getTaskStats: () => Promise<void>;
  setFilters: (filters: TaskFilters) => void;
  clearFilters: () => void;
}

// Component props types
export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onToggleImportance: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export interface TaskFormProps {
  task?: Task;
  onSubmit: (data: CreateTaskData | UpdateTaskData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface TaskFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  stats: TaskStats | null;
}

// Utility types
export type PriorityColor = 'success' | 'warning' | 'danger';
export type StatusColor = 'success' | 'warning';

export interface PriorityConfig {
  label: string;
  color: PriorityColor;
  icon: React.ComponentType<{ className?: string }>;
}

export interface StatusConfig {
  label: string;
  color: StatusColor;
  icon: React.ComponentType<{ className?: string }>;
}
