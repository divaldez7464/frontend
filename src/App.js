// import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Wishlist from './components/Wishlist';
import React from 'react';



function App() {
//   useEffect(()=> {
//     fetch('http://localhost:8080/hello')
//     .then(response=>response.text())
//     .then(result=>console.log(result));
// },[]);
  return (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
  );
}

export default App;
