import React, { useEffect, useState, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/Message';

const OrderListScreen = () => {
  const navigate = useNavigate();
  const { state } = useContext(CartContext);
  const { userInfo } = state;

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const { data } = await axios.get('http://localhost:5000/api/orders', config);
          setOrders(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [userInfo, navigate]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <Button variant="light" className="btn-sm">
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
