import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './styles.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Features from './components/Features';

import HomeScreen from './screens/HomeScreen';
import CollectionScreen from './screens/CollectionScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import OrderListScreen from './screens/admin/OrderListScreen';
import SearchScreen from './screens/SearchScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminApp from './AdminApp';

import { CartProvider } from './context/CartContext';

const PageLayout = ({ children }) => {
  const location = useLocation();
  const showFeatures = !location.pathname.startsWith('/admin');
  return (
    <>
      {children}
      {showFeatures && <Features />}
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />

        <main className="py-4">
          <Container fluid>
            <PageLayout>
              <Routes>
                {/* Checkout Flow */}
                <Route path="/shipping" element={<ShippingScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />

                {/* Public Pages */}
                <Route path="/" element={<HomeScreen />} />
                <Route path="/collection" element={<CollectionScreen />} />
                <Route path="/about" element={<AboutScreen />} />
                <Route path="/contact" element={<ContactScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} />

                {/* ✅ Cart Routes */}
                <Route path="/cart/:id" element={<CartScreen />} />
                <Route path="/cart" element={<CartScreen />} />

                <Route path="/checkout" element={<CheckoutScreen />} />
                <Route path="/search" element={<SearchScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />

                {/* Admin Routes */}
                <Route path="/admin/*" element={<AdminApp />} />
                <Route path="/admin/productlist" element={<ProductListScreen />} />
                <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
                <Route path="/admin/orderlist" element={<OrderListScreen />} />
              </Routes>
            </PageLayout>
          </Container>
        </main>

        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
