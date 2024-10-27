import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const [items, setItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            const userData = localStorage.getItem("userData");
            if (userData) {
                const parsedData = JSON.parse(userData);
                console.log("Logged in user:", parsedData.username); 
            } else {
                console.log("No user is logged in");
            }
            try {
                const parsedData = JSON.parse(userData);
                const response = await fetch('https://project02-3bd6df9baeaf.herokuapp.com/api/items', {
                    method: 'GET',
                    credentials: 'include', 
                    headers: {
                        'Authorization': `Bearer ${parsedData.username}`
                    },
                });

                console.log('Response status:', response.status); 
                const data = await response.json();
                console.log(data);

                if (response.ok) {
                    setItems(data); 
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
    }, []);

    // Delete item handler
    const handleDelete = async (itemId) => {
        try {
            const response = await fetch(`https://project02-3bd6df9baeaf.herokuapp.com/api/items?item_name=${itemId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                setItems(prevItems => prevItems.filter(item => item.id !== itemId));
                console.log("Item deleted successfully.");
            } else {
                console.error("Failed to delete item.");
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <>
        <Navbar/>
        <div style={styles.container}>
            <h2>My Wishlist</h2>
            {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            <div style={styles.itemsContainer}>
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} style={styles.itemBox}>
                            <h3>{item.itemName}</h3>
                            <p>{item.description}</p>
                            <p>Price: ${item.price}</p>
                            {/* Delete button */}
                            <button
                                onClick={() => handleDelete(item.id)}
                                style={styles.deleteButton}
                            >
                                Delete
                            </button>
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
        padding: '40px',
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
    deleteButton: {
        backgroundColor: '#ff4d4d',
        color: '#fff',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Wishlist;
