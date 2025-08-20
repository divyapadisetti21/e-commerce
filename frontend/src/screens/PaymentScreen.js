// // src/screens/PaymentScreen.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container } from 'react-bootstrap';

// const PaymentScreen = () => {
//   const navigate = useNavigate();

//   const [paymentMethod, setPaymentMethod] = useState('PayPal');

//   const submitHandler = (e) => {
//     e.preventDefault();
//     localStorage.setItem('paymentMethod', paymentMethod);
//     navigate('/placeorder');
//   };

//   return (
//     <Container>
//       <h2>Payment Method</h2>
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId="paymentMethod" className="mb-3">
//           <Form.Check
//             type="radio"
//             label="PayPal"
//             id="PayPal"
//             name="paymentMethod"
//             value="PayPal"
//             checked
//             onChange={(e) => setPaymentMethod(e.target.value)}
//           />
//           <Form.Check
//             type="radio"
//             label="Cash on Delivery"
//             id="COD"
//             name="paymentMethod"
//             value="Cash on Delivery"
//             onChange={(e) => setPaymentMethod(e.target.value)}
//           />
//         </Form.Group>

//         <Button type="submit" variant="primary">
//           Place Order
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default PaymentScreen;


// src/screens/PaymentScreen.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', paymentMethod);
    alert('Order Placed! Thank you 😊');
    navigate('/');
  };

  return (
    <div className="form-container">
      <h2>Payment Method</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="paymentMethod" className="mb-3">
          <Form.Check
            type="radio"
            label="Cash on Delivery"
            value="Cash on Delivery"
            checked={paymentMethod === 'Cash on Delivery'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="UPI / Net Banking"
            value="UPI"
            checked={paymentMethod === 'UPI'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="success">Place Order</Button>
      </Form>
    </div>
  );
};

export default PaymentScreen;
