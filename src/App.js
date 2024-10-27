// import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Profile from './components/Profile';
import Wishlist from './components/Wishlist';
import SignUp from './components/Signup';
import Item from './components/Item';
import EditUser from './components/EditUser';
import React from 'react';
// import CurrentUser from './components/test';




function App() {
//   useEffect(()=> {
//     fetch('http://localhost:8080/hello')
//     .then(response=>response.text())
//     .then(result=>console.log(result));
// },[]);
  return (
  // < CurrentUser>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/item" element={<Item />} />
            <Route path="/edituser" element={<EditUser/>} />
          
          </Routes>
        </Router>
// </CurrentUser> 
 );
}

export default App;
