import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Base API URL (switches automatically between local & deployed)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

const Product = ({ product }) => {
  // handle both internal and external images
  const imageUrl = product.image.startsWith('http')
    ? product.image
    : `${API_BASE_URL}${product.image}`;

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={imageUrl}
          alt={product.name}
          className="hover:scale-110 transition ease-in-out"
          style={{ height: '250px', objectFit: 'cover' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h5">₹{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
