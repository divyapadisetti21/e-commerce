import React from 'react';
// --- IMPORT Nav HERE ---
import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light pt-5 mt-5">
      <Container>
        {/* --- SUBSCRIBE SECTION --- */}
        <Row className="justify-content-center text-center mb-5">
          <Col md={8}>
              <h2 className='section-title mt-0'>Subscribe now & get 20% off</h2>
              <p className="text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <Form className="d-flex mt-4">
                  <Form.Control type="email" placeholder="Enter your email" className="me-2 rounded-0" />
                  <Button variant="dark" className="rounded-0">SUBSCRIBE</Button>
              </Form>
          </Col>
       </Row>

       <hr />

        {/* --- FOOTER LINKS SECTION --- */}
        <Row className="py-5">
          <Col md={5} className="mb-4">
            <h4 className="footer-logo">FOREVER<span className="logo-dot">.</span></h4>
            <p className="text-muted footer-text">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </Col>
          <Col md={{ span: 2, offset: 1 }} className="mb-4">
            <h5>COMPANY</h5>
            {/* THIS SECTION IS NOW CORRECT */}
            <Nav className="flex-column footer-links">
              <Nav.Link href="/" className="p-0">Home</Nav.Link>
              <Nav.Link href="/about" className="p-0">About us</Nav.Link>
              <Nav.Link href="#" className="p-0">Delivery</Nav.Link>
              <Nav.Link href="#" className="p-0">Privacy policy</Nav.Link>
            </Nav>
          </Col>
          <Col md={4} className="mb-4">
            <h5>GET IN TOUCH</h5>
            <ul className="list-unstyled footer-links">
              <li>+1-000-000-0000</li>
              <li>greatstackdev@gmail.com</li>
              <li>Instagram</li>
            </ul>
          </Col>
        </Row>
      </Container>
      
      {/* --- COPYRIGHT SECTION --- */}
      <div className="bg-dark text-white text-center py-3">
        <Container>
          <p className="mb-0">Copyright 2024@ greatstack.dev - All Right Reserved.</p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;