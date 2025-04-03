import React, { useEffect, useState } from 'react'; // Import useEffect
import './App.css';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

const LOCAL_STORAGE_KEY = 'react-todo-list-todos';

function App() {
  // Load todos from local storage or use empty array
  const [todos, setTodos] = useState(() => {
    try {
      const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
      console.error("Error parsing todos from localStorage", error);
      return [];
    }
  });

  // Save todos to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to localStorage", error);
    }
  }, [todos]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text, isCompleted: false }];
    setTodos(newTodos);
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const editTodo = (index, newText) => {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <h1>My To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-list">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            toggleComplete={toggleComplete}
            removeTodo={removeTodo}
            editTodo={editTodo} // Pass editTodo function
          />
        ))}
      </div>
    </div>
  );
}

export default App;
