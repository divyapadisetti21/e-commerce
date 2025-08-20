import React, { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const Header = () => {
  const { state, dispatch } = useContext(CartContext);
  const { cartItems, userInfo } = state;

  const logoutHandler = () => {
    dispatch({ type: 'USER_LOGOUT' });
  };

  // ✅ Calculate total quantity
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header>
      <Navbar bg="light" expand="lg" className="shadow-sm py-3">
        <Container>
          {/* Logo - Left */}
          <LinkContainer to="/">
            <Navbar.Brand className="fw-bold fs-3">Forever</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Middle Nav */}
            <Nav className="mx-auto">
              <LinkContainer to="/">
                <Nav.Link>HOME</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/collection">
                <Nav.Link>COLLECTION</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>ABOUT</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link>CONTACT</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/admin/productlist">
                <Nav.Link>ADMIN PANEL</Nav.Link>
              </LinkContainer>
            </Nav>

            {/* Right Nav */}
            <Nav className="ms-auto">
              <LinkContainer to="/search">
                <Nav.Link>
                  <i className="fas fa-search"></i> Search
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart{' '}
                  {totalQty > 0 && (
                    <span className="badge bg-danger ms-1">{totalQty}</span>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
