import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from './Logout';

function Navbar() {

  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = (e) => {
    e.preventDefault(); 
    setShowConfirm(true); 
  };

  const handleConfirmLogout = () => {
    console.log('User logged out'); 
    setShowConfirm(false);
    navigate("/");
  };

  const handleCancelLogout = () => {
    setShowConfirm(false);
  };

  return (


    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">Wishlist</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">My Wishlist</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/item">Item</Link>
            </li>
            <li className="nav-item">
            <button className="nav-link btn btn-link" onClick={handleLogoutClick}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
      {showConfirm && (
        <Logout
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}

    </nav>
  );
}

export default Navbar;
