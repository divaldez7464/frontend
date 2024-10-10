import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Wishlist() {
    return (
        <div>
            <Navbar />
            <div className="wishlist-container">
                <h1 >Wishlist</h1>

            </div>
        </div>
    );
}

export default Wishlist;