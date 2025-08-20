import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ContactScreen = () => {
  return (
    <Container className="py-5">
      <Row className="align-items-center">
        {/* Left Side: Image */}
        <Col md={6}>
          <img
            src="https://foreverbuy.in/assets/contact_img-CyOum2vk.png"
            alt="Contact Forever"
            className="img-fluid rounded shadow"
          />
        </Col>

        {/* Right Side: Contact Form */}
        <Col md={6}>
          <h2>Contact Us</h2>
          <Form>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="message" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Your message..." />
            </Form.Group>

            <Button type="submit" variant="dark">Send</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactScreen;
