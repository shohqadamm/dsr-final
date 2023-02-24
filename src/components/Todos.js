import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/todos').then(response => {
      setTodos(response.data);
    });
  }, []);

  const handleDelete = id => {
    axios.delete(`http://localhost:3000/api/v1/todos/${id}`).then(() => {
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    });
  };

  const handleUpdate = (id, text) => {
    axios.put(`http://localhost:3000/api/v1/todos/${id}`, { text }).then(response => {
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, text: response.data.text } : todo
        )
      );
    });
  };

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}{' '}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>{' '}
            <button onClick={() => handleUpdate(todo.id, todo.text)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
