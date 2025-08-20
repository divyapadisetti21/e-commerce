import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import './HomeScreen.css';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/products`
        );
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Container className="my-5">
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="display-5 fw-bold">OUR BESTSELLERS</h1>
            <p className="lead">Latest Arrivals</p>
            <Button href="/collection" variant="dark" size="lg">
              SHOP NOW
            </Button>
          </Col>
          <Col md={6}>
            <img
              src="https://foreverbuy.in/assets/hero_img-DOCOb6wn.png"
              alt="Bestseller"
              className="img-fluid rounded"
            />
          </Col>
        </Row>
      </Container>

      {/* Product Grid */}
      <Container className="mt-5">
        <h2 className="mb-4 text-center">LATEST COLLECTIONS</h2>
        <Row>
          {loading ? (
            <p>Loading...</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product) => (
              <Col key={product._id} sm={6} md={4} lg={3} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <div className="image-wrapper">
                    <Card.Img
                      variant="top"
                      src={
                        product.image.startsWith('http')
                          ? product.image
                          : `${process.env.REACT_APP_API_BASE_URL}${product.image}`
                      }
                      alt={product.name}
                      className="product-img hover-zoom"
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>₹{product.price.toFixed(2)}</Card.Text>
                    <Button
                      href={`/product/${product._id}`}
                      variant="primary"
                      className="mt-auto"
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
