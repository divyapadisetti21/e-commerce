import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const qty = Number(new URLSearchParams(location.search).get('qty')) || 1;
  const size = new URLSearchParams(location.search).get('size') || '';

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products/${id}`);
        const item = { product: data._id, name: data.name, image: data.image, price: data.price, countInStock: data.countInStock, qty, size };
        const existing = cartItems.find(x => x.product === item.product && x.size === item.size);
        const updatedCart = existing ? cartItems.map(x => (x.product === item.product && x.size === item.size ? item : x)) : [...cartItems, item];
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      } catch (err) { console.error(err); }
    };
    fetchProduct();
  }, [id]);

  const removeFromCartHandler = (productId, size) => {
    const updated = cartItems.filter(x => !(x.product === productId && x.size === size));
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  const checkoutHandler = () => navigate('/shipping');

  return (
    <Row>
      <Col md={8}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={`${item.product}-${item.size}`}>
                <Row className="align-items-center">
                  <Col md={2}><Image src={item.image || '/placeholder.png'} alt={item.name} fluid rounded /></Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <p>Size: {item.size}</p>
                  </Col>
                  <Col md={2}>₹{item.price || 0}</Col>
                  <Col md={2}>
                    <Form.Select value={item.qty} onChange={(e) => {
                      const updated = cartItems.map(x => x.product === item.product && x.size === item.size ? { ...x, qty: Number(e.target.value) } : x);
                      setCartItems(updated);
                      localStorage.setItem('cartItems', JSON.stringify(updated));
                    }}>
                      {[...Array(item.countInStock || 1).keys()].map(x => <option key={x+1} value={x+1}>{x+1}</option>)}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variant="light" onClick={() => removeFromCartHandler(item.product, item.size)}>
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items): ₹
                {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block w-100" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                Proceed To Shipping
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
