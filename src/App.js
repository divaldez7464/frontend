import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; 
import Home from './components/Home'; 
import Wishlist from './components/Wishlist';
import Signup from './components/Signup';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<Signup />} />

            </Routes>
        </Router>
    );
}

export default App;