import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import profileimage from '../Image/TestImage.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';

function Wishlist() {

    const item={
        name: "Sneakers",
        description: "Desctiption of the item.",
        category: "Shoes",
        price: "$30.99",
        available: true,
        url: "https://example.com/cool-sneakers",
    };
    return (
        <div>
            <Navbar />
            <div className="wishlist-container container mt-5">
                <h1 className="text-center mb-4">Wishlist</h1>
                <div className="card mx-auto" style={{ width: '18rem' }}>
                    <div className="card-body text-center">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.description}</p>
                        <p className="card-text"><strong>Category:</strong> {item.category}</p>
                        <p className="card-text"><strong>Price:</strong> {item.price}</p>
                        <p className="card-text"><strong>Available:</strong> {item.available ? "Yes" : "No"}</p>
                        <p className="card-text"><strong>url:</strong> {item.url}</p>
                        <a href={item.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Buy</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Wishlist;