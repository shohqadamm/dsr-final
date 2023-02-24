import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = 
        // await axios.post('http://localhost:3000/api/v1/login', {
        //     login: username,
        //     password: password
        //   }
        // )
        await fetch('http://localhost:3000/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ login: username, password: password })
        });
  
        if (!response.ok) {
          throw new Error('Invalid username or password');
        }
  
        const data = await response.json();
        console.log(data);
        const userRole = data.role;
  
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userRole', userRole);
  
        navigate('/me');
      } catch (error) {
        setError(error.message);
      }
};

  return (
    <div className='form'>
      <h1 className='text-xlg'>Login!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
           <button className='btn--eye' type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M0 0v18l982 982h18v-18L18 0H0m505 262c182 0 364 76 466 229 3 4 3 9 0 14-103 154-287 231-470 232S134 662 31 508c-2-4-2-10 0-14 103-154 287-231 470-232h4m0 25h-4c-173 1-346 73-444 214 98 141 271 212 444 211 174-1 346-73 444-214-97-140-268-211-440-211m-5 38c46 0 91 18 124 51s51 78 51 124-18 91-51 124-78 51-124 51-91-18-124-51-51-78-51-124c0-32 9-63 25-90 6 18 23 29 41 29 12 0 23-4 31-12 8-9 12-20 12-31 0-19-12-36-31-42 29-19 63-29 97-29"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><path d="M981 484c6 8 6 19 0 27-105 159-293 237-480 238-186 1-374-76-480-234-6-8-6-19 0-28 106-158 293-237 480-238h4c186 1 372 78 476 235M501 299c-167 1-332 70-429 202 96 133 262 199 429 198 167 0 333-69 429-201-95-132-259-198-425-199h-4m123 77c33 33 51 78 51 124s-18 91-51 124-78 51-124 51-91-18-124-51-51-78-51-124c0-32 9-63 25-90 6 18 23 29 41 29 24 0 43-19 43-43 0-19-12-36-31-42 29-19 63-29 97-29 46 0 91 18 124 51"/></svg>}
            </button>
        </div>
        <div>
          <button className='btn btn--primary' type="submit">Login</button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
