import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    console.log(document.cookie);
    if (!isLoggedIn) {
      navigate('/');
    } else {
      fetch('http://localhost:3000/api/v1/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': 'http://localhost:3000'
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          return response.json();
        })
        .then(data => {
          setUsers(data);
        })
        .catch(error => {
          setError(error.message);
        });
    }
  }, []);


  function Logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    navigate('/')
  }

  return (
    // if()
    <div className='app'>
      <div className="account">
        <button className='btn btn--primary' onClick={Logout}>Logout</button>
      </div>
      <h1>All Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} {' '} {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;