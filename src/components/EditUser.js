import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const EditUser = () => {
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Fetch the current user data when the component loads
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://project02-3bd6df9baeaf.herokuapp.com/api/users/current', {
                    method: 'GET',
                    credentials: 'include', // Send session cookies
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUsername(userData.username);
                } else {
                    setErrorMessage('Failed to fetch user data. Please log in.');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setErrorMessage('Error fetching user data.');
            }
        };

        fetchUserData();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://project02-3bd6df9baeaf.herokuapp.com/api/users/update', {
                method: 'PUT', // Use PUT or PATCH as configured on the backend
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include session cookies
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                alert('User updated successfully!');
                navigate('/profile'); // Redirect to profile page
            } else {
                const errorText = await response.text();
                setErrorMessage(`Update failed: ${errorText}`);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            setErrorMessage('Error updating user. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Edit User</h2>
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            <form onSubmit={handleUpdate} style={styles.form}>
                <div style={styles.inputContainer}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" style={styles.updateButton}>
                    Update
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        width: '300px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputContainer: {
        marginBottom: '15px',
    },
    updateButton: {
        padding: '10px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    },
};
export default EditUser;