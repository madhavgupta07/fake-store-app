// Dashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import {
  auth,
  db,
  logout,
} from '../firebase';
import {
  query,
  collection,
  getDocs,
  where,
} from 'firebase/firestore';
import {
  Container,
  Box,
  CircularProgress,
  Grid,
  Button,
  ButtonGroup,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography 
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import Navbar from './Navbar';
import {getAPICall} from '../Datalayer/axiosMethodCalls'
import {
  getProductUrl,
  sortProductUrl,
} from '../Configuration/config_url';
import AddToFakeStore from './AddToFakeStore';

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [toggleSort, setToggleSort] = useState(false);
  const [productData, setProductData] = useState([]);
  const [filter, setFilter] = useState([]);

  const navigate = useNavigate();

  // Handle product deletion
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${getProductUrl}/${productId}`);
      setFilter((prevData) =>
        prevData.filter((product) => product.id !== productId)
      );
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  // Fetch user name
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert('An error occurred while fetching user data');
    }
  };

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const response = await getAPICall(getProductUrl);
      setProductData(response.data);
      setFilter(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Filter products by category
  const filterProducts = (category) => {
    if (category === 'ALL') {
      setFilter(productData);
    } else {
      const filteredProducts = productData.filter((product) => product.category === category);
      setFilter(filteredProducts);
    }
  };

  // Sort products
  const sortProducts = async () => {
    const sortedOrder = toggleSort ? 'asc' : 'desc';
    const sortedProducts = await getAPICall(`${sortProductUrl}${sortedOrder}`);
    setFilter(sortedProducts.data);
    setToggleSort(!toggleSort);
  };

  useEffect(() => {
    if (!user) return navigate('/login');
    getAllProducts();
    fetchUserName();
  }, [user]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="">
      <Navbar />
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '10px',
          }}
        >
          {/* Buttons for filtering */}
          <ButtonGroup color='primary' variant='outlined'>
            {['ALL', "women's clothing", "men's clothing", 'electronics', 'jewelery'].map((category) => (
              <Button
                key={category}
                onClick={() =>
                  category === 'ALL' ? setFilter(productData) : filterProducts(category)
                }
                className="btn btn-outline-dark me-2"
              >
                {category}
              </Button>
            ))}
          </ButtonGroup>

          <Button className="btn btn-outline-dark me-2" onClick={sortProducts}>
          <SortIcon/>
          </Button>

          <h2>Hi, {name}</h2>
        </Box>

        {/* Product Grid */}
        <Grid container spacing={5} style={{ marginTop: 20 }}>
          {filter.map((product) => (
            <Grid item xs={12} sm={4} ms={4} key={product.id}>
              {/* Product Card */}
              <Card sx={{ maxWidth: 345 }}>
                {/* Card Media */}
                <CardMedia
                  sx={{ height: 140 }}
                  image={product.image}
                  title={product.title}
                />
                {/* Card Content */}
                <CardContent>
                  <Typography gutterBottom component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    ${product.price}
                  </Typography>
                </CardContent>
                {/* Card Actions */}
                <CardActions>
                  <Button size="small" onClick={() => handleDelete(product.id)}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Dashboard;
