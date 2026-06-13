import { useState } from 'react';
import './App.css';

function App() {
  // 1. State for the list of tasks
  const [tasks, setTasks] = useState([]);
  
  // 2. State for the current input value
  const [inputValue, setInputValue] = useState('');

  // ✅ Function to Add a Task
  const addTask = (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    
    if (inputValue.trim() === '') return; // Don't add empty tasks

    const newTask = {
      id: Date.now(), // Unique ID based on current timestamp
      text: inputValue,
      completed: false,
    };

    setTasks([...tasks, newTask]); // Add new task to the existing array
    setInputValue(''); // Clear the input field
  };

  // ❌ Function to Delete a Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ✔️ Function to Mark a Task as Done/Undone
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="app-container">
      <h1>📝 My To-Do List</h1>
      
      {/* Input Form */}
      <form onSubmit={addTask} className="input-form">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {/* Task List */}
      <ul className="task-list">
        {tasks.length === 0 && <p className="empty-msg">No tasks yet. Add one above!</p>}
        
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleComplete(task.id)} className="task-text">
              {task.completed ? '✔️ ' : '⭕ '} {task.text}
            </span>
            <button 
              onClick={() => deleteTask(task.id)} 
              className="delete-btn"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;