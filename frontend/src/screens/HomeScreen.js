import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import Product from '../components/Product';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`);
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setProducts([]);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
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
                <Product product={product} />
              </Col>
            ))
          )}
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
