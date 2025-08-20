import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/products/${id}`
      );
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    if (!size) {
      setError('Please select a size');
      return;
    }
    navigate(`/cart/${id}?qty=${qty}&size=${size}`);
  };

  return (
    <>
      <Row>
        <Col md={6}>
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '350px',
                display: 'block',
                background: '#f8f9fa',
                borderRadius: '8px',
              }}
            />
          </div>
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
            <ListGroup.Item>
              <strong>₹{product.price}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group controlId="size">
                <Form.Label>Select Size</Form.Label>
                <Form.Control
                  as="select"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option value="">-- Select --</option>
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                  <option value="XL">XL</option>
                </Form.Control>
              </Form.Group>
              {error && <p className="text-danger mt-2">{error}</p>}
            </ListGroup.Item>

            <ListGroup.Item>
              <Form.Group controlId="qty">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  as="select"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button onClick={addToCartHandler} variant="dark">
                Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
