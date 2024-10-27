import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import profileimage from '../Image/TestImage.jpg';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
    const [user, setUser] = useState(null);
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const storedUserData = localStorage.getItem("userData");
            if (!storedUserData) {
                setErrorMessage('No user data found. Please log in.');
                navigate('/Login');
                return;
            }

            const parsedData = JSON.parse(storedUserData);
            try {
                const response = await fetch('https://project02-3bd6df9baeaf.herokuapp.com/api/users/currentuser', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Authorization': `Bearer ${parsedData.username}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data.');
                }

                const data = await response.json();
                setUser(data);
                setNewUsername(data.username);
            } catch (error) {
                console.error('Error fetching user:', error);
                setErrorMessage('Failed to load user data.');
            }
        };

        fetchUser();
    }, [navigate]);

    const handleUpdateProfile = async () => {
        // Your update profile logic here...
    };

    const handleDeleteAccount = async () => {
        // Your delete account logic here...
    };

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
                        <h5 className="card-title">
                            {user ? user.username : <span className="text-muted">Loading user data...</span>}
                        </h5>
                        <input
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="New Username"
                            className="form-control mb-2"
                        />
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            className="form-control mb-2"
                        />
                        <button className="btn btn-primary" onClick={handleUpdateProfile}>Update Profile</button>
                        <button className="btn btn-danger" onClick={handleDeleteAccount} style={{ marginLeft: '10px' }}>Delete Account</button>
                        {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
