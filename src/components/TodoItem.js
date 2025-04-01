import React from 'react';

function TodoItem({ todo, index, toggleComplete, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
    >
      {todo.text}
      <div>
        <button onClick={() => toggleComplete(index)}>
          {todo.isCompleted ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => removeTodo(index)}>Remove</button>
      </div>
    </div>
  );
}

export default TodoItem;
