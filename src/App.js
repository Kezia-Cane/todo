import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

const API_URL = 'http://localhost:3001/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [formKey, setFormKey] = useState(0);


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
  }, []);


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
      .then(newTodo => setTodos(prevTodos => [...prevTodos, newTodo]))
      .catch(error => console.error("Error adding todo:", error));
  }, []);


  const toggleComplete = useCallback((id) => {

    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(updatedTodo => {

        setTodos(prevTodos => prevTodos.map(t => (t.id === id ? updatedTodo : t)));
      })
      .catch(error => console.error("Error updating todo:", error));
  }, [todos]);


  const removeTodo = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok && res.status !== 204) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }


      setTodos(prevTodos => prevTodos.filter(t => t.id !== id));

      setFormKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error("Error deleting todo:", error);

    }
  }, []);



  return (
    <div className="app">
      <h1>My To-Do List</h1>

      <TodoForm key={formKey} addTodo={addTodo} />
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
