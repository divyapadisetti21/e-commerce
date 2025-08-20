// src/screens/PlaceOrderScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, ListGroup, Card, Container } from 'react-bootstrap';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress'));
  const paymentMethod = localStorage.getItem('paymentMethod');
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  const placeOrderHandler = () => {
    alert('Order Placed!');
    navigate('/');
  };

  return (
    <Container>
      <h2>Order Summary</h2>
      <ListGroup variant="flush" className="mb-4">
        <ListGroup.Item>
          <h5>Shipping</h5>
          <p>
            {shippingAddress.address}, {shippingAddress.city},{' '}
            {shippingAddress.postalCode}, {shippingAddress.country}
          </p>
        </ListGroup.Item>

        <ListGroup.Item>
          <h5>Payment Method</h5>
          <p>{paymentMethod}</p>
        </ListGroup.Item>

        <ListGroup.Item>
          <h5>Order Items</h5>
          {cartItems.map((item) => (
            <p key={item.product}>
              {item.name} x {item.qty} = ${item.qty * item.price}
            </p>
          ))}
        </ListGroup.Item>
      </ListGroup>

      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h4>Total: $
              {cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
            </h4>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button type="button" className="w-100" onClick={placeOrderHandler}>
              Confirm & Place Order
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Container>
  );
};

export default PlaceOrderScreen;
