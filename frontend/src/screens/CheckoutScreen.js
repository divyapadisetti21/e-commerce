import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Form, Card } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import Message from '../components/Message';

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(CartContext);
  const { cartItems, shippingAddress = {}, userInfo } = state;

  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=/checkout');
    }
    if (cartItems.length === 0) {
      navigate('/');
    }
  }, [userInfo, navigate, cartItems]);

  // --- Initialize state with user info ---
  const [firstName, setFirstName] = useState(userInfo ? userInfo.name.split(' ')[0] : '');
  const [lastName, setLastName] = useState(userInfo ? userInfo.name.split(' ').slice(1).join(' ') : '');
  const [email, setEmail] = useState(userInfo ? userInfo.email : '');

  // State for address fields
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [phone, setPhone] = useState(shippingAddress.phone || '');

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const shippingFee = 10;
  const total = subtotal + shippingFee;

  const placeOrderHandler = (e) => {
    e.preventDefault();
    const fullShippingAddress = { firstName, lastName, email, address, city, postalCode, country, phone };
    dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: fullShippingAddress });

    alert(`Order placed successfully with ${paymentMethod}!`);
    localStorage.removeItem('cartItems');
    navigate('/');
    window.location.reload();
  };

  return (
    <Form onSubmit={placeOrderHandler}>
      <Row>
        {/* --- DELIVERY INFORMATION --- */}
        <Col md={7}>
          <h2 className='mb-4'>Delivery Information</h2>
          <Card className="p-4 border-0 shadow-sm">
            <Row>
              <Col md={6}>
                <Form.Group controlId="firstName" className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastName" className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="address" className="mb-3">
              <Form.Label>Street Address</Form.Label>
              <Form.Control type="text" required value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group controlId="city" className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" required value={city} onChange={(e) => setCity(e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="postalCode" className="mb-3">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="country" className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" required value={country} onChange={(e) => setCountry(e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="phone" className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* --- ORDER SUMMARY & PAYMENT --- */}
        <Col md={5}>
          <h2 className="mb-4 d-none d-md-block"> </h2>
          <Card className="p-4 border-0 shadow-sm">
            <h4>Order Summary</h4>
            <ListGroup variant='flush'>
              <ListGroup.Item className="d-flex justify-content-between px-0">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between px-0">
                <span>Shipping Fee</span>
                <span>${shippingFee.toFixed(2)}</span>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between px-0 border-top pt-3">
                <strong>Total</strong>
                <strong>${total.toFixed(2)}</strong>
              </ListGroup.Item>
            </ListGroup>

            <h4 className="mt-4">Payment Method</h4>
            {cartItems.length === 0 && <Message>Your cart is empty</Message>}

            {/* --- Payment Options --- */}
            <div className="d-grid gap-3 my-3">
              {['Stripe', 'Razorpay', 'COD'].map((method) => (
                <Card
                  key={method}
                  className={`payment-method-card ${paymentMethod === method ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod(method)}
                >
                  <Card.Body>
                    <Form.Check
                      type="radio"
                      id={method}
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      label={
                        <span>
                          {method === 'Stripe' && <i className="fab fa-cc-stripe me-2"></i>}
                          {method === 'Razorpay' && <i className="fa fa-credit-card me-2"></i>}
                          {method === 'COD' && <i className="fa fa-money-bill-wave me-2"></i>}
                          {method === 'COD' ? 'Cash on Delivery' : method}
                        </span>
                      }
                    />
                  </Card.Body>
                </Card>
              ))}
            </div>

            <Button type="submit" className="w-100 py-2" variant="primary" disabled={cartItems.length === 0}>
              Place Order
            </Button>
          </Card>
        </Col>
      </Row>
    </Form>
  );
};

export default CheckoutScreen;
