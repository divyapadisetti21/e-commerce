// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const AdminRoute = () => {
  const { state } = useContext(CartContext);
  const { userInfo } = state;

  return userInfo && userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminRoute;
