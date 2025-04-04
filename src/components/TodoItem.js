import React from 'react'; // Removed useState
import { FaTrash } from 'react-icons/fa'; // Removed FaEdit, FaSave, FaTimes

// Removed index and editTodo from props
function TodoItem({ todo, toggleComplete, removeTodo }) {

  // Removed all editing state and handlers (isEditing, editText, handleEdit, handleSave, handleCancel, handleInputChange, handleKeyPress)

  return (
    // Use todo.completed instead of todo.isCompleted
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
      {/* Removed editing input field */}
      <span
        // Call toggleComplete with todo.id instead of index
        onClick={() => toggleComplete(todo.id)}
        // Use todo.completed instead of todo.isCompleted
        style={{ textDecoration: todo.completed ? 'line-through' : '', cursor: 'pointer' }}
      >
        {todo.text}
      </span>

      <div className="todo-buttons">
        {/* Removed editing buttons (Save, Cancel) */}
        {/* Removed non-editing buttons section wrapper */}
        {/* Call toggleComplete with todo.id instead of index */}
        <button onClick={() => toggleComplete(todo.id)} className={`icon-button complete-button ${todo.completed ? 'undo' : ''}`}>
          {/* Use todo.completed instead of todo.isCompleted */}
          {todo.completed ? 'Undo' : '✓'}
        </button>
        {/* Removed Edit button */}
        <button
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete "${todo.text}"?`)) {
              // Call removeTodo with todo.id instead of index
              removeTodo(todo.id);
            }
          }}
          className="icon-button delete-button"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

// Wrap the component in React.memo
export default React.memo(TodoItem);
