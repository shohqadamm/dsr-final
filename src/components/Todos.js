import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

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
        toast.error(error.message)
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
      toast.success('todo deleted')
    } else {
      console.log('Error deleting todo');
      toast.error('todo deleted')

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
      <ToastContainer />
      <div className="account">
        <button className='flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red-500' onClick={Logout}>Logout</button>
        <Link className='flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red-500' to="/me">Home</Link>
      </div>
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest text-4xl font-bold">Todo List</h1>
            <ul>
              {todos.map(todo => {
                // if (localStorage.getItem('userRole') === 'user') {
                return (
                  <li key={todo.id} className="flex mb-5 bg-slate-100 p-3 items-center justify-between">
                    <div>
                      <h1 className='text-xl'>
                        {todo.title}
                      </h1>
                      <p className=''>{todo.description}</p>
                      <p className='text-slate-800'>{todo.createdBy}</p>
                    </div>
                    <div>
                      <button className='flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red-500' onClick={() => deleteTodo(todo.id)}>Delete</button>
                      <button className='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded  hover:text-white hover:bg-green-500' onClick={() => enterEditMode(todo)}>Update</button>
                    </div>
                  </li>
                )
                // }
              }
              )}
            </ul>

            <h1 className="text-grey-darkest text-4xl font-bold mt-5">Add todo</h1>
            <form onSubmit={addTodo} className="flex mt-4">
              <input className='shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker' value={todoTitle} type="text" onChange={event => setTitle(event.target.value)} placeholder="title" />
              <input className='shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker' value={todoDescription} type="text" onChange={event => setDescription(event.target.value)} placeholder="description" />
              <button className='flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-orange-400' type="submit">Add</button>
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
          </div></div></div></div>
  );
}


export default Todos;