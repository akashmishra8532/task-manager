/**
 * Dashboard Page Component
 * Main dashboard with task management interface
 * 
 * Features:
 * - Task list view
 * - Task creation
 * - Task filtering
 * - Statistics overview
 * - Responsive design
 */

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTask } from '../contexts/TaskContext';
import { Task } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { tasks, stats, isLoading, getTasks, createTask, toggleTaskStatus, deleteTask } = useTask();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'medium' as const });

  useEffect(() => {
    // Only load tasks if not already loaded
    if (tasks.length === 0) {
      getTasks();
    }
  }, []); // Empty dependency array to run only once

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      await createTask(newTask);
      setNewTask({ title: '', description: '', priority: 'medium' });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleToggleStatus = async (taskId: string) => {
    try {
      await toggleTaskStatus(taskId);
    } catch (error) {
      console.error('Error toggling task status:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowCreateForm(true)}
                className="btn-primary"
              >
                Add Task
              </button>
              <button
                onClick={logout}
                className="btn-secondary"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="card">
              <div className="card-body text-center">
                <h3 className="text-2xl font-bold text-primary-600">{stats.total}</h3>
                <p className="text-sm text-gray-600">Total Tasks</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body text-center">
                <h3 className="text-2xl font-bold text-success-600">{stats.completed}</h3>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body text-center">
                <h3 className="text-2xl font-bold text-warning-600">{stats.pending}</h3>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body text-center">
                <h3 className="text-2xl font-bold text-primary-600">{stats.completionRate}%</h3>
                <p className="text-sm text-gray-600">Completion Rate</p>
              </div>
            </div>
          </div>
        )}

        {/* Create Task Form */}
        {showCreateForm && (
          <div className="card mb-8">
            <div className="card-header">
              <h2 className="text-lg font-medium">Create New Task</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleCreateTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="input"
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="input"
                    rows={3}
                    placeholder="Enter task description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                    className="input"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary">
                    Create Task
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium">Your Tasks</h2>
          </div>
          <div className="card-body">
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No tasks yet. Create your first task to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task: Task) => (
                  <div
                    key={task.id}
                    className={`p-4 border rounded-lg ${
                      task.status === 'completed' ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={task.status === 'completed'}
                          onChange={() => handleToggleStatus(task.id)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <div>
                          <h3 className={`font-medium ${
                            task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-sm text-gray-600">{task.description}</p>
                          )}
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`badge badge-${task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'success'}`}>
                              {task.priority}
                            </span>
                            {task.isImportant && (
                              <span className="badge badge-primary">Important</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
