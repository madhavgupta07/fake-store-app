// AddToFakeStore.jsx

import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import Navbar from './Navbar';
import { postAPICall } from '../Datalayer/axiosMethodCalls';
const AddToFakeStore = ({ onProductAdded }) => {
    const [formData, setFormData] = useState({
        id:'',
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            const response = await postAPICall('https://fakestoreapi.com/products', formData);

            if (response.status === 200) {
                onProductAdded(response.data);
                console.log('Data Added ', response.data);
                // Reset the form
                setFormData({
                    id:'',
                    title: '',
                    price: '',
                    description: '',
                    image: '',
                    category: '',
                });
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('Failed to add product', error);
        }
    };

    return (
        <>
            <Navbar />
            <Container maxWidth="sm">
                <Box sx={{ marginTop: 4, textAlign: 'center' }}>
                    <Typography variant="h4" component="div" gutterBottom>
                        Add to Fake Store
                    </Typography>
                    <form>
                        <TextField
                            label="Title"
                            name="title"
                            fullWidth
                            value={formData.title}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Price"
                            name="price"
                            fullWidth
                            value={formData.price}
                            onChange={handleChange}
                            margin="normal"
                            required
                            type="number"
                        />
                        <TextField
                            label="Description"
                            name="description"
                            fullWidth
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Image URL"
                            name="image"
                            fullWidth
                            value={formData.image}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Category"
                            name="category"
                            fullWidth
                            value={formData.category}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Add Product
                        </Button>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default AddToFakeStore;
