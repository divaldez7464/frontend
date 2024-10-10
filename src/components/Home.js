import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <Navbar />
            <div className="home-container">
                <h1 >Home</h1>
                <h1>Welcome to the wishlist website</h1>
                <p className="lead">Begin by adding items to a list</p>
                
                <h2>Features Items</h2>
                <div className="row">
                    <div className="col-md-4">
                        <h4>Shoes</h4>
                        <p>Example</p>
                    </div>
                    <div className="col-md-4">
                        <h4>Games</h4>
                        <p>Example description</p>
                    </div>
                    <div className="col-md-4">
                        <h4>Sweaters</h4>
                        <p>Example Descritiption.</p>
                    </div>
                </div>

                <div className="mt-4">
                    <button className="btn btn-primary" onClick={() => navigate('/wishlist')}>
                        Item
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
