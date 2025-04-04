import React, { useState } from 'react'; // Keep React import

function TodoForm({ addTodo }) {
  // console.log('TodoForm rendered'); // Remove render log
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return; // Don't add empty todos
    addTodo(value);
    setValue(''); // Clear input after adding
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => {
          // console.log('TodoForm onChange fired. New value:', e.target.value); // Remove logging
          setValue(e.target.value);
        }}
        placeholder="Add a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
}

// Wrap the component in React.memo
export default React.memo(TodoForm);
