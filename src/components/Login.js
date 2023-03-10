import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { Navigate, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': 'http://localhost:3000'
      },
      body: JSON.stringify({ login: username, password: password })
    });
    if (response.ok) {
      const data = await response.json();
      const userRole = data.role;

      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userRole', userRole);

      navigate('/me')
    }
    toast.error('Please fill all fields or check login and password')

  };

  return (
    <div className='bg-gray-50 dark:bg-gray-900'>
      <ToastContainer />
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          {isLoggedIn ? navigate('/me') : (<div className='form' >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                Sign in to your account
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className='flex items-center bg-white dark:bg-gray-700 rounded p-2 m-2 border border-gray-300 focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:border-gray-600'>
                <FontAwesomeIcon icon={faUser} />
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  class="bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div className='flex items-center bg-white dark:bg-gray-700 rounded p-2 m-2 border border-gray-300 focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:border-gray-600'>
                <FontAwesomeIcon icon={faLock} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  placeholder="••••••••" className=" text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                />
                <button className='btn--eye' type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon> : <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>}
                </button>
              </div>
              <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 m-2 text-center dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit">Login</button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400 m-2'>This simple app is created by <a className='font-medium text-primary-600 hover:underline dark:text-primary-500' href="https://instagram.com/shohqadamm">@shohqadamm</a></p>
            </form>
          </div >)}
        </div>
      </div >
    </div >
  );
}

export default Login;