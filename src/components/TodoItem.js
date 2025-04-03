import React, { useState } from 'react';
import { FaEdit, FaSave, FaTimes, FaTrash } from 'react-icons/fa'; // Import icons

function TodoItem({ todo, index, toggleComplete, removeTodo, editTodo }) { // Add editTodo prop
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      editTodo(index, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text); // Reset text
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  // Handle Enter key press in edit input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className={`todo ${todo.isCompleted ? 'completed' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Save on Enter
          autoFocus // Focus input on edit
          className="edit-input"
        />
      ) : (
        <span
          onClick={() => toggleComplete(index)} // Toggle complete on text click
          style={{ textDecoration: todo.isCompleted ? 'line-through' : '', cursor: 'pointer' }}
        >
          {todo.text}
        </span>
      )}

      <div className="todo-buttons">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="icon-button save-button">
              <FaSave />
            </button>
            <button onClick={handleCancel} className="icon-button cancel-button">
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => toggleComplete(index)} className={`icon-button complete-button ${todo.isCompleted ? 'undo' : ''}`}>
              {/* Optionally add check/undo icons here later */}
              {todo.isCompleted ? 'Undo' : '✓'}
            </button>
            <button onClick={handleEdit} className="icon-button edit-button">
              <FaEdit />
            </button>
            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete "${todo.text}"?`)) {
                  removeTodo(index);
                }
              }}
              className="icon-button delete-button"
            >
              <FaTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
