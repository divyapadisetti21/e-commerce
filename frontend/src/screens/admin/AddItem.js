import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Form = styled.form` max-width: 600px; `;
const FormGroup = styled.div` margin-bottom: 1rem; `;
const Label = styled.label` display: block; margin-bottom: 0.5rem; `;
const Input = styled.input` width: 100%; padding: 0.5rem; box-sizing: border-box; `;
const Button = styled.button` padding: 0.8rem 1.5rem; background: black; color: white; border: none; cursor: pointer; `;

const AddItem = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [uploading, setUploading] = useState(false);

    const uploadHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try {
            const { data } = await axios.post('/api/upload', formData);
            setImage(data.image);
            setUploading(false);
        } catch (error) {
            setUploading(false);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const newProduct = { name, price, image, description: 'Sample', category: 'Sample', type: 'Sample', sizes: ['S'] };
        await axios.post('/api/products', newProduct);
        alert('Product Added!');
    };

    return (
        <Form onSubmit={submitHandler}>
            <h2>Add Item</h2>
            <FormGroup><Label>Image</Label><Input type="text" value={image} onChange={e => setImage(e.target.value)} readOnly /><Input type="file" onChange={uploadHandler} />{uploading && <p>Uploading...</p>}</FormGroup>
            <FormGroup><Label>Name</Label><Input type="text" value={name} onChange={e => setName(e.target.value)} /></FormGroup>
            <FormGroup><Label>Price</Label><Input type="number" value={price} onChange={e => setPrice(e.target.value)} /></FormGroup>
            <Button type="submit">ADD</Button>
        </Form>
    );
};
export default AddItem;