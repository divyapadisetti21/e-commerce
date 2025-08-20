// src/AdminApp.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLoginScreen from './screens/admin/AdminLoginScreen';
import AddItemScreen from './screens/admin/AddItemScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import AdminLayout from './screens/admin/AdminLayout';

const AdminApp = () => {
  const isAdmin = localStorage.getItem('adminLoggedIn');

  return (
    <Routes>
      {!isAdmin ? (
        <Route path="*" element={<AdminLoginScreen />} />
      ) : (
        <Route element={<AdminLayout />}>
          <Route path="add" element={<AddItemScreen />} />
          <Route path="list" element={<ProductListScreen />} />
          <Route path="orders" element={<OrderListScreen />} />
          <Route path="*" element={<Navigate to="/admin/add" />} />
        </Route>
      )}
    </Routes>
  );
};

export default AdminApp;
