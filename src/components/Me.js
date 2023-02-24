import React from 'react';

function Me() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
  
    return (
      <div>
        {isLoggedIn ? (
          <div>
            <h1>Welcome!</h1>
            <p>Your role is: {userRole}</p>
          </div>
        ) : (
          <h1>Please log in to access this page.</h1>
        )}
      </div>
    );
}

export default Me;