import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  if (!product) return null;

  const imageSrc =
    product.image && product.image.startsWith('http')
      ? product.image
      : product.image
      ? `${process.env.REACT_APP_API_BASE_URL}${product.image}`
      : '/placeholder.png'; // fallback image

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={imageSrc}
          alt={product.name || 'Product'}
          className="hover:scale-110 transition ease-in-out"
          style={{ height: '250px', objectFit: 'cover' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name || 'Unnamed Product'}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h5">₹{product.price ? product.price.toFixed(2) : 0}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
