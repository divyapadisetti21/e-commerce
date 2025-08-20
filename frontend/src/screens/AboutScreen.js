import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const AboutScreen = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center">
        {/* Left Side: Image */}
        <Col md={6}>
          <img
            src="https://foreverbuy.in/assets/about_img-BAJyTXw9.png"
            alt="About Forever"
            className="img-fluid rounded shadow"
          />
        </Col>

        {/* Right Side: Text */}
        <Col md={6}>
          <h2>About FOREVER</h2>
          <p>
            Welcome to FOREVER. We bring you the best in fashion, style, and trends. 
            Our mission is to deliver premium quality at affordable prices.
          </p>
          <p>
            From timeless classics to modern must-haves, our collections are designed
            to inspire confidence and style.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutScreen;
