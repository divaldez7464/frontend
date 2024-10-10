import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Profile() {
    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <h1 >Profile</h1>

            </div>
        </div>
    );
}

export default Profile;