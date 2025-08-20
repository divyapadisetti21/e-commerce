// 

// src/screens/ShippingScreen.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ShippingScreen = () => {
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    const shipping = { address, city, postalCode, country };
    localStorage.setItem('shippingAddress', JSON.stringify(shipping));
    navigate('/payment');
  };

  return (
    <div className="form-container">
      <h2>Shipping Address</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control required value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="city" className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control required value={city} onChange={(e) => setCity(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="postalCode" className="mb-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="country" className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control required value={country} onChange={(e) => setCountry(e.target.value)} />
        </Form.Group>
        <Button type="submit" variant="primary">Continue to Payment</Button>
      </Form>
    </div>
  );
};

export default ShippingScreen;
