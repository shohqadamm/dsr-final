import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [todotitle, setTitle] = useState('')
  const [todoDescription, setDescription] = useState('')

  const addTodo = async (event) => {
    event.preventDefault();
    if (todotitle === '') return;
    if (todoDescription === '') return;
    const response = await fetch('http://localhost:3000/api/v1/todos', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      },
      body: JSON.stringify({ title: todotitle, description: todoDescription })
      // body: { "title": "salomduasdfaasdfnyo", "description": "aasdfasdafadssdf" }
    });

    console.log(JSON.stringify({ title: todotitle, description: todoDescription }));
    if (response.ok) {
      setTitle('');
      setDescription('');
      fetchTodos();
    } else {
      console.log('Error creating todo');
    }

  }

  useEffect(() => {
    fetchTodos()
  }, []);

  async function fetchTodos() {
    fetch('http://localhost:3000/api/v1/todos', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        return response.json();
      })
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }

  function Logout() {
    fetch('http://localhost:3000/api/v1/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      }
    }).then(response => {
      if (response.ok) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        navigate('/')
      }
    })
  }


  async function deleteTodo(id) {
    const response = await fetch('http://localhost:3000/api/v1/todos/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
      credentials: 'include',
    });

    if (response.ok) {
      fetchTodos();
    } else {
      console.log('Error deleting todo');
    }
  }


  return (
    <div className='app'>
      <div className="account">
        <button className='btn btn--primary' onClick={Logout}>Logout</button>
      </div>
      <h1>All Todos</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} {' '} <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={addTodo}>
        <input value={todotitle} type="text" onChange={event => setTitle(event.target.value)} />
        <input value={todoDescription} type="text" onChange={event => setDescription(event.target.value)} />
        <button className='btn btn--primary' type="submit">Add</button>
      </form>
    </div>
  );
}

export default Todos;