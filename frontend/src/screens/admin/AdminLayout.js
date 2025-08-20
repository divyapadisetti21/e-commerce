// src/screens/admin/AdminLayout.js
import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/admin');
  };

  return (
    <div style={{ display: 'flex' }}>
      <aside style={{ width: '200px', padding: '20px', background: '#f2f2f2' }}>
        <h4>Admin Menu</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/admin/add">➕ Add Item</Link></li>
          <li><Link to="/admin/list">📦 List Items</Link></li>
          <li><Link to="/admin/orders">📑 Orders</Link></li>
          <li><button onClick={logoutHandler}>🚪 Logout</button></li>
        </ul>
      </aside>
      <main style={{ flexGrow: 1, padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
