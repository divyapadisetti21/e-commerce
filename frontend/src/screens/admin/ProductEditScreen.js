import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import Message from '../../components/Message';

const ProductEditScreen = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const { state } = useContext(CartContext);
    const { userInfo } = state;

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        } else {
            const fetchProduct = async () => {
                try {
                    const { data } = await axios.get(`http://localhost:5000/api/products/${productId}`);
                    setName(data.name); setPrice(data.price); setImage(data.image); setBrand(data.brand);
                    setCategory(data.category); setType(data.type); setCountInStock(data.countInStock); setDescription(data.description);
                } catch (err) {
                    setError('Product not found');
                }
            };
            if (!name || productId !== name._id) { // To avoid infinite loops
                 fetchProduct();
            }
        }
    }, [productId, userInfo, navigate, name]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
            setImage(data.image);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };
    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } };
            await axios.put(`http://localhost:5000/api/products/${productId}`, { name, price, image, brand, category, type, countInStock, description }, config);
            navigate('/admin/productlist');
        } catch (err) {
            setError('Update failed');
        }
    };

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
            <h1>Edit Product</h1>
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className="my-3"><Form.Label>Name</Form.Label><Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control></Form.Group>
                <Form.Group controlId='price' className="my-3"><Form.Label>Price</Form.Label><Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control></Form.Group>
                <Form.Group controlId='image' className="my-3"><Form.Label>Image</Form.Label><Form.Control type='text' placeholder='Enter image url or upload' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                <Form.Control type='file' label='Choose File' onChange={uploadFileHandler}></Form.Control>
                {uploading && <p>Uploading...</p>}</Form.Group>
                <Form.Group controlId='brand' className="my-3"><Form.Label>Brand</Form.Label><Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control></Form.Group>
                <Form.Group controlId='countInStock' className="my-3"><Form.Label>Count In Stock</Form.Label><Form.Control type='number' placeholder='Enter count in stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control></Form.Group>
                <Form.Group controlId='category' className="my-3"><Form.Label>Category (Men, Women, or Kids)</Form.Label><Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control></Form.Group>
                <Form.Group controlId='type' className="my-3"><Form.Label>Type (e.g., Topwear, Bottomwear)</Form.Label><Form.Control type='text' placeholder='Enter type' value={type} onChange={(e) => setType(e.target.value)}></Form.Control></Form.Group>
                <Form.Group controlId='description' className="my-3"><Form.Label>Description</Form.Label><Form.Control as='textarea' rows={3} placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control></Form.Group>
                <Button type='submit' variant='primary' className="my-3">Update</Button>
            </Form>
        </>
    );
};

export default ProductEditScreen;