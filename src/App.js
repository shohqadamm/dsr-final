import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Me from './components/Me';
import Users from './components/Users';
import Todos from './components/Todos';
import Login from './components/Login';

function App() {
  return <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/me' element={<Me />} />
    <Route path='/users' element={<Users />} />
    <Route path='/todos' element={<Todos />} />
  </Routes>
}
export default App;
