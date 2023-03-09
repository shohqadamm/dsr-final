import React from 'react';
import { useNavigate } from 'react-router-dom';

function Me() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userRole = localStorage.getItem('userRole');

  const navigate = useNavigate();


  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Welcome!</h1>
          <p>Your role is: {userRole}</p>
        </div>
      ) : navigate('/')}
    </div>
  );
}

export default Me;