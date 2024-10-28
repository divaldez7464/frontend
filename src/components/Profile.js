import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import profileimage from '../Image/TestImage.jpg';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Item.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    // const userData = localStorage.getItem("userData");
    // console.log(userData);
    // const parsedData = JSON.parse(userData);
    // const username = parsedData.username;
   
    useEffect(() => {
        const fetchUser = async () => {
            const userData = localStorage.getItem("userData");
            if (userData) {
                const parsedData = JSON.parse(userData);
                console.log("Logged in user:", parsedData.username); 
                try {
                    const response = await fetch('https://project02-3bd6df9baeaf.herokuapp.com/api/users/currentuser', {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Authorization': `Bearer ${parsedData.username}`
                        },
                    });

                    console.log('Response status:', response.status); 
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data);
                    } else if (response.status === 401) {
                        setErrorMessage('You are not authorized. Please log in.');
                    } else {
                        // setErrorMessage('Failed to fetch user data. Please try again.');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setErrorMessage('An error occurred while fetching user data.');
                }
            } else {
                console.log("No user is logged in");
                setErrorMessage('No user is logged in. Please log in.');
            }
        };

        fetchUser();
    }, []);

    // Delete account handler
    // Delete account handler
const handleDeleteAccount = async () => {
  const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
  if (confirmDelete) {
      // Retrieve the username from localStorage or state
      const userData = localStorage.getItem("userData");
      if (userData) {
          const parsedData = JSON.parse(userData);
          const username = parsedData.username;
         

          console.log("username:" + username);
          try {
              // Send DELETE request with username as a query parameter
              const response = await fetch(`https://project02-3bd6df9baeaf.herokuapp.com/api/users/logout?username=${username}`, {
                  method: 'DELETE',
                  credentials: 'include', // Include credentials for session
              });
            
              // Check if the response is OK
              if (response.ok) {
                  localStorage.removeItem("userData"); // Remove user data from local storage
                  navigate('/'); // Redirect to home or login page after deletion
                  console.log("Account deleted successfully.");
              } else {
                  const errorText = await response.text(); // Get raw text response
                  console.error("Failed to delete account:", errorText);
                  setErrorMessage("Failed to delete account. Server responded with: " + errorText);
              }
          } catch (error) {
              console.error('Error deleting account:', error);
              setErrorMessage('An error occurred while trying to delete the account.');
          }
      } else {
          console.error("No user data found in local storage.");
          setErrorMessage("You need to be logged in to delete your account.");
      }
  }
};


    return (
        <div className="background">
            <Navbar />
            <div className="container mt-5">
                <h1 className="text-center mb-4">User Profile</h1>
                {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Error message display */}
                <div className="card mx-auto" style={{ width: '18rem' }}>
                    <img 
                        src={profileimage}
                        className="card-img-top rounded-circle mt-3" 
                        alt="Profile" 
                    />
                    <div className="card-body text-center">
                        {/* <h5 className="card-title">Username: {user ? user.username : 'Loading...'}</h5> */}
                        <h1>
                            <button className="btn btn-danger" onClick={() => navigate('/edituser')}>Edit Profile</button>
                        </h1>
                        <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;