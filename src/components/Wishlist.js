import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'

const Wishlist = () => {
    const [items, setItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch items from the backend
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('https://project02-3bd6df9baeaf.herokuapp.com/api/items', {
                    method: 'GET',
                    credentials: 'include', // Ensure session/cookies are sent
                });

                if (response.ok) {
                    const data = await response.json();
                    setItems(data); // Update the state with the fetched items
                } else if (response.status === 401) {
                    setErrorMessage('You are not authorized. Please log in.');
                } else {
                    setErrorMessage('Failed to fetch items. Please try again.');
                }
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []); // Empty dependency array means this will run once when the component mounts

    return (
        <>
        <Navbar/>
        <div style={styles.container}>
            <h2>My Wishlist</h2>
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            <div style={styles.itemsContainer}>
                {items.length > 0 ? (
                    items.map((item, index) => (
                        <div key={index} style={styles.itemBox}>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>Price: {item.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No items found in your wishlist.</p>
                )}
            </div>
        </div>
        </>
    );
};

// Simple styles for the Wishlist component
const styles = {
    container: {
        width: '80%',
        margin: '0 auto',
        padding: '20px',
        textAlign: 'center',
    },
    itemsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: '40px'
    },
    itemBox: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        margin: '10px',
        width: '30%',
        textAlign: 'left',
    },
    error: {
        color: 'red',
    },
};

export default Wishlist;
