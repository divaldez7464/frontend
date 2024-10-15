import React from 'react';
import { useNavigate } from 'react-router-dom';
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
            <h1>Home</h1>
            <h1 className="home-container">Welcome To Your Wishlist</h1>
            <p className="lead">Begin by adding items to a list</p>
            
            <h2>Featured Items</h2>
            <div className="row">
                <div className="col">
                    <h4>Shoes</h4>
                    <p>Example</p>
                </div>
                <div className="col">
                    <h4>Games</h4>
                    <p>Example description</p>
                </div>
                <div className="col">
                    <h4>Sweaters</h4>
                    <p>Example Description.</p>
                </div>
            </div>

            <div className="mt-4">
                <button className="btn btn-primary" onClick={() => navigate('/wishlist')}>
                    Item
                </button>
            </div>
            </div> 
        </div>
        </div>
    );
}

export default Home;
