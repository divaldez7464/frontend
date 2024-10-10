import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Item() {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <div className="Item-container">
                <h1 >Item</h1>

            </div>
        </div>
    );
}

export default Item;