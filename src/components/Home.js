import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar/>
        <div className="home-container">
            <div className="background">
            

                <div className="home-style">
                    <h1>Welcome to the Wishlist Website</h1>
                    <p className="lead">Begin by adding items to a list</p>
                </div>

                <div className="row">
                    <div className="col">
                        <h4>Shoes</h4>
                        <p>Example description</p>
                    </div>
                    <div className="col">
                        <h4>Games</h4>
                        <p>Example description</p>
                    </div>
                    <div className="col">
                        <h4>Sweaters</h4>
                        <p>Example description</p>
                    </div>
                </div>

                <div className="home-button">
                    <button className="btn btn-primary" onClick={() => navigate('/wishlist')}>
                        View Wishlist
                    </button>
                </div>
            </div>
        </div> 


    );
}

export default Home;
