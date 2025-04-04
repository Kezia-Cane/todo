import React, { useCallback, useEffect, useState } from 'react'; // Import useCallback
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

const API_URL = 'http://localhost:3001/api/todos'; // Backend API URL

function App() {
  const [todos, setTodos] = useState([]);
  const [formKey, setFormKey] = useState(0); // Add state for form key

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

  // Wrap addTodo in useCallback to stabilize its reference
  const addTodo = useCallback((text) => {
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
      .then(newTodo => setTodos(prevTodos => [...prevTodos, newTodo])) // Use functional update for setTodos
      .catch(error => console.error("Error adding todo:", error));
  }, []); // Empty dependency array as addTodo doesn't depend on external state/props from App's scope

  // Note: Backend uses 'completed', frontend used 'isCompleted'
  // Note: We now use 'id' instead of 'index'
  // Wrap in useCallback
  const toggleComplete = useCallback((id) => {
    // Need 'todos' in dependency array if accessing it directly
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
        // Use functional update for setTodos
        setTodos(prevTodos => prevTodos.map(t => (t.id === id ? updatedTodo : t)));
      })
      .catch(error => console.error("Error updating todo:", error));
  }, [todos]); // Add 'todos' as dependency because we use it in find()

  // Note: We now use 'id' instead of 'index'
  // Refactored using async/await and functional state update
  // Wrap in useCallback
  const removeTodo = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok && res.status !== 204) { // 204 No Content is a success status for DELETE
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Filter out the deleted todo from the state using functional update
      setTodos(prevTodos => prevTodos.filter(t => t.id !== id));
      // Increment form key to force TodoForm remount
      setFormKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Optionally add user feedback here if deletion fails
    }
  }, []); // No dependencies needed here as it only uses 'id' and 'setTodos'

  // editTodo functionality removed as backend doesn't support it yet

  return (
    <div className="app">
      <h1>My To-Do List</h1>
      {/* Add key prop to TodoForm */}
      <TodoForm key={formKey} addTodo={addTodo} />
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
