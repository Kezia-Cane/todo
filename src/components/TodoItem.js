import React from 'react';
import { FaTrash } from 'react-icons/fa';

function TodoItem({ todo, toggleComplete, removeTodo }) {


  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
      <span
        onClick={() => toggleComplete(todo.id)}
        style={{ textDecoration: todo.completed ? 'line-through' : '', cursor: 'pointer' }}
      >
        {todo.text}
      </span>

      <div className="todo-buttons">
        <button onClick={() => toggleComplete(todo.id)} className={`icon-button complete-button ${todo.completed ? 'undo' : ''}`}>
          {todo.completed ? 'Undo' : '✓'}
        </button>
        <button
          onClick={() => {
            removeTodo(todo.id);
          }}
          className="icon-button delete-button"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default React.memo(TodoItem);
