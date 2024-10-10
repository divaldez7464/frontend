import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function Home() {
    return (
        <div>
            <Navbar />
            <div className="home-container">
                <h1 >Home</h1>

            </div>
        </div>
    );
}

export default Home;
