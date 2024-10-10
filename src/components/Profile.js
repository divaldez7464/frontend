import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import profileimage from '../Image/TestImage.jpg';

function Profile() {
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
                        <h5 className="card-title">Username: FakeAccount</h5>
                        <p className="card-text">Profile description here</p>
                       <h1><button className="btn btn-danger">Edit Profile</button></h1>
                        <button className="btn btn-danger">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;