// src/screens/admin/AdminLoginScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminLoggedIn', true);
      navigate('/admin/add');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      <form onSubmit={loginHandler}>
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginScreen;
