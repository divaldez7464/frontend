import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import profileimage from '../Image/TestImage.jpg';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

function DeleteUser() {
    const navigate = useNavigate();

}


function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await fetch('https://your-backend-url/api/users/currentuser', {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setUser(data);
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        };
        fetchUser();
    }, []);
    if (!user) {
        return <div>Loading...</div>;
      }



    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h1 className="text-center mb-4">User Profile</h1>
                <div className="card mx-auto" style={{ width: '18rem' }}>
                    <img 
                        src={profileimage}
                        className="card-img-top rounded-circle mt-3" 
                        alt="Profile" 
                    />
                    <div className="card-body text-center">
                        <h5 className="card-title">Username: {user.username}</h5>
                        <p className="card-text">Profile description here</p>
                       <h1><button className="btn btn-danger" onClick={() => navigate('/edituser')}>Edit Profile </button></h1>
                        <button className="btn btn-danger">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;