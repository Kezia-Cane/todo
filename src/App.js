import React, { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

const API_URL = 'http://localhost:3001/api/todos'; // Backend API URL

function App() {
  const [todos, setTodos] = useState([]);

  // Fetch todos from backend on component mount
  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setTodos(data))
      .catch(error => console.error("Error fetching todos:", error));
  }, []); // Empty dependency array means this runs once on mount

  const addTodo = (text) => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(newTodo => setTodos([...todos, newTodo]))
      .catch(error => console.error("Error adding todo:", error));
  };

  // Note: Backend uses 'completed', frontend used 'isCompleted'
  // Note: We now use 'id' instead of 'index'
  const toggleComplete = (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }), // Send the new completed status
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(updatedTodo => {
        setTodos(todos.map(t => (t.id === id ? updatedTodo : t)));
      })
      .catch(error => console.error("Error updating todo:", error));
  };

  // Note: We now use 'id' instead of 'index'
  const removeTodo = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok && res.status !== 204) { // 204 No Content is a success status for DELETE
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        // Filter out the deleted todo from the state
        setTodos(todos.filter(t => t.id !== id));
      })
      .catch(error => console.error("Error deleting todo:", error));
  };

  // editTodo functionality removed as backend doesn't support it yet

  return (
    <div className="app">
      <h1>My To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-list">
        {todos.map((todo) => ( // Removed index from map
          <TodoItem
            key={todo.id} // Use todo.id as key
            todo={todo}
            toggleComplete={toggleComplete} // Pass id-based function
            removeTodo={removeTodo} // Pass id-based function
            // editTodo removed
          />
        ))}
      </div>
    </div>
  );
}

export default App;
