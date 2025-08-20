// src/screens/admin/AddItemScreen.js
import React, { useState } from 'react';
import axios from 'axios';

const AddItemScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/products', {
        name,
        price,
        image,
        description,
        category,
        countInStock,
      });
      alert('Product added: ' + data.name);
      setName('');
      setPrice('');
      setImage('');
      setDescription('');
      setCategory('');
      setCountInStock('');
    } catch (err) {
      alert('Error adding product');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Add New Product</h2>
      <input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} type="number" required />
      <input placeholder="Image Path (e.g. /images/shirt.jpg)" value={image} onChange={(e) => setImage(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input placeholder="Stock Count" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} type="number" />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddItemScreen;
