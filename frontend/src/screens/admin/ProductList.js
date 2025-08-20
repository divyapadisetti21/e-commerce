import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Table = styled.table` width: 100%; border-collapse: collapse; `;
const Th = styled.th` border-bottom: 1px solid #ddd; padding: 12px; text-align: left; background-color: #f7f7f7; `;
const Td = styled.td` border-bottom: 1px solid #ddd; padding: 12px; text-align: left; `;
const DeleteButton = styled.button` background: #ff4d4d; color: white; border: none; padding: 5px 10px; cursor: pointer; `;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await axios.get('/api/products');
    setProducts(data);
  };
  useEffect(() => { fetchProducts(); }, []);
  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      await axios.delete(`/api/products/${id}`);
      fetchProducts();
    }
  };
  return (
    <div>
      <h2>All Products List</h2>
      <Table>
        <thead><tr><Th>IMAGE</Th><Th>NAME</Th><Th>PRICE</Th><Th>ACTION</Th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <Td><img src={p.image} alt={p.name} width="50" /></Td>
              <Td>{p.name}</Td><Td>${p.price}</Td>
              <Td><DeleteButton onClick={() => deleteHandler(p._id)}>X</DeleteButton></Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default ProductList;