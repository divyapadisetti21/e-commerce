import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProfileScreen = () => {
  const { state } = useContext(CartContext);
  const { userInfo } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  if (!userInfo) return null;

  return (
    <div className="container py-5">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {userInfo.name}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      {/* You can add more profile fields here */}
    </div>
  );
};

export default ProfileScreen;
