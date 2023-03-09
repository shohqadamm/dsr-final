import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Me from './components/Me';
import Users from './components/Users';
import Todos from './components/Todos';
import Login from './components/Login';

function PrivateRoute({ element, isLoggedIn }) {
  return isLoggedIn ? element : <Navigate to="/login" />;
}

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/me' element={<Me />} />
    <Route path='/users' element={<Users />} />
    <Route path='/todos' element={<PrivateRoute element={<Todos />} isLoggedIn={isLoggedIn} />} />
  </Routes>
}
export default App;