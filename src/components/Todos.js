import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/todos').then(response => {
      setTodos(response.data);
    });
  }, []);

  return (
    <div>
      <h1>All Todos</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
