'use client';
import React, { useState } from 'react';
import './styles.css';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const ToDoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') {
      alert('Please enter a task.');
      return;
    }
    const newTaskObject: Task = {
      id: Date.now(),
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, newTaskObject]);
    setNewTask('');
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="todo-container">
      <div className="todo-header-basics">
        <div className='todo-header-text'>
          <h1 className="todo-header">To Do App</h1>
          <p className="todo-header2">Stop Procrastinating, Start Organizing</p>
        </div>
        <div className="todo-icons">
          <div className="icon">
            <img src="/images/icon1.png" alt="Icon 1" />
          </div>
          <div className="icon">
            <img src="/images/icon2.png" alt="Icon 2" />
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className='LowerHeader'>
        {completedTasks > 0 ? (
          <p className="task-summary">
            {completedTasks} completed
          </p>
        ) : (
          <p className="task-summary placeholder">&nbsp;</p> 
        )}

        <button className="task-button">
          <img src="/images/icon3.png" alt="Hide" className="button-icon" />
          Hide Completed
        </button>
      </div>

      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className="todo-item">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              className="todo-checkbox"
            />
            <span
              className={`todo-task-text ${task.completed ? 'completed' : ''}`}
              onClick={() => toggleTaskCompletion(task.id)}
            >
              {task.text}
            </span>
            <button
              className="delete-button"
              onClick={() => deleteTask(task.id)}
            >
              <img src="images/icon4.png" alt="Delete" className="delete-icon" />
            </button>
          </li>
        ))}
      </ul>
      <div className="todo-input-container">
        <div className="todo-placeholder">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New Note"
            className="todo-input"
          />
          <button onClick={addTask} className="todo-add-button">
            Add New Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
