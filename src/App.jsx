// App.jsx

import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register.jsx';
import Dashboard from './Components/Dashboard.jsx';
import Reset from './Components/Reset.jsx';
import AddToFakeStore from './Components/AddToFakeStore.jsx';

function App() {
    const [productData, setProductData] = useState([]);

    const handleProductAdded = (newProduct) => {
        setProductData((prevData) => [...prevData, newProduct]);
    };

    return (
        <div className="app">
            <Routes>
                <Route
                    path="/"
                    element={<Dashboard/>}
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route exact path="/reset" element={<Reset />} />
                <Route
                    exact
                    path="/add-product"
                    element={<AddToFakeStore onProductAdded={handleProductAdded} />}
                />
            </Routes>
        </div>
    );
}

export default App;
