import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import Message from '../components/Message';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');

  const { search } = useLocation();
  const navigate = useNavigate();
  const redirect = new URLSearchParams(search).get('redirect') || '/';

  const { state, dispatch } = useContext(CartContext);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(''); setMessage('');
    if (password !== confirmPassword) setMessage('Passwords do not match');
    else {
      try {
        const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users`, { name, email, password });
        dispatch({ type: 'USER_LOGIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate(redirect);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        <h1>Sign Up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="password" className="my-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">Register</Button>
        </Form>
        <Row className="py-3">
          <Col>
            Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default RegisterScreen;
