import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUndo, FaHeadset, FaShippingFast } from 'react-icons/fa'; // Using react-icons for a professional look

const Features = () => {
  return (
    <Container className="features-section my-5">
      <Row className="text-center">
        <Col md={4} className="feature-item">
          <FaShippingFast size={40} className="mb-3" />
          <h4>Easy Exchange Policy</h4>
          <p className="text-muted">We offer a hassle-free exchange policy.</p>
        </Col>
        <Col md={4} className="feature-item">
          <FaUndo size={40} className="mb-3" />
          <h4>7 Days Return Policy</h4>
          <p className="text-muted">We provide 7 days free return policy.</p>
        </Col>
        <Col md={4} className="feature-item">
          <FaHeadset size={40} className="mb-3" />
          <h4>Best customer support</h4>
          <p className="text-muted">We provide 24/7 customer support.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Features;