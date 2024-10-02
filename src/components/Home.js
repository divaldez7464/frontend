import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Home</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home" style={{ cursor: 'pointer' }}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/wishlist" style={{ cursor: 'pointer' }}>
                                    Wishlist
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container text-center mt-5">
                <h1 className="mb-4">Welcome to the Home Page!</h1>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-danger me-2" onClick={() => navigate('/')}>
                        Logout
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/wishlist')}>
                        Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
