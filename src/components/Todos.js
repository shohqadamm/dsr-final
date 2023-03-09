import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import EditForm from './EditForm'

function Todos() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [todoTitle, setTitle] = useState('')
  const [todoDescription, setDescription] = useState('')

  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTodos()
  }, []);

  const addTodo = async (event) => {
    event.preventDefault();
    if (todoTitle === '') return;
    if (todoDescription === '') return;
    const response = await fetch('http://localhost:3000/api/v1/todos', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      },
      body: JSON.stringify({ title: todoTitle, description: todoDescription })
    });
    if (response.ok) {
      setTitle('');
      setDescription('');
      fetchTodos();
    } else {
      alert('todo title must be unique')
    }
  }

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
  };

  async function updateTask(id) {
    console.log(id);
    todos.map(todo => {
      if (todo.id === id) {
        setTitle(todo.title)
        setDescription(todo.description)
      }
    })
    todos.map(todo => console.log(todo.title))

    todos.map(todo => todo.id === id ? setTitle(todo.title) : '')
    todos.map(todo => todo.id === id ? setDescription(todo.description) : '')
  };

  const closeEditMode = () => {
    setIsEditing(false);
  }
  const enterEditMode = (todo) => {
    setEditedTask(todo);
    setIsEditing(true);
  }


  return (
    <div className='app'>
      <div className="account">
        <button className='btn btn--primary' onClick={Logout}>Logout</button>
      </div>
      <h1>All Todos</h1>
      <ul>
        {todos.map(todo => {
          // if (localStorage.getItem('userRole') === 'user') {
          return (
            <li key={todo.id}>
              <h1>
                {todo.title}
              </h1>
              <p>{todo.description} {' '}</p>
              <p>{todo.createdBy} {' '}</p>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => enterEditMode(todo)}>Update</button>
            </li>
          )
          // }
        }
        )}
      </ul>
      <form onSubmit={addTodo}>
        <input value={todoTitle} type="text" onChange={event => setTitle(event.target.value)} placeholder="title" />
        <input value={todoDescription} type="text" onChange={event => setDescription(event.target.value)} placeholder="description" />
        <button className='btn btn--primary' type="submit">Add</button>
      </form>
      {
        isEditing && (
          <EditForm
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
            fetchTodos={fetchTodos}
          />
        )
      }
    </div>
  );
}


export default Todos;