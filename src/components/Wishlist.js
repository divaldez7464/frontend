import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const [items, setItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [updatedData, setUpdatedData] = useState({ 
        itemName: '', 
        description: '', 
        price: '', 
        url: '' 
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            const userData = localStorage.getItem("userData");
            if (userData) {
                const parsedData = JSON.parse(userData);
                console.log("Logged in user:", parsedData.username); 
                try {
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
            } else {
                console.log("No user is logged in");
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

    // Handle input changes for the update form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedData(prevData => ({ ...prevData, [name]: value }));
    };

    // Handle click on the Update button
    const handleUpdateClick = (item) => {
        setCurrentItem(item);
        setUpdatedData({
            itemName: item.itemName,
            description: item.description,
            price: item.price,
            url: item.url, // Pre-fill with current URL
        });
        setShowUpdateModal(true);
    };

    // Handle update submission
    const handleUpdateSubmit = async () => {
        try {
            const response = await fetch(`https://project02-3bd6df9baeaf.herokuapp.com/api/items/${currentItem.id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData), // Include updated data
            });

            if (response.ok) {
                // Update the item in the local state
                setItems(prevItems => prevItems.map(item =>
                    item.id === currentItem.id ? { ...item, ...updatedData } : item
                ));
                setShowUpdateModal(false); // Close the modal after successful update
                console.log("Item updated successfully.");
            } else {
                const errorData = await response.json(); // Get error details
                console.error("Failed to update item:", errorData);
            }
        } catch (error) {
            console.error('Error updating item:', error);
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
                            <p>Price: {item.price}</p>
                            {/* Display the URL if it exists */}
                            {item.url && (
                                <p>
                                    URL: <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                                </p>
                            )}
                            <button
                                onClick={() => handleDelete(item.id)}
                                style={styles.deleteButton}
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleUpdateClick(item)}
                                style={styles.updateButton}
                            >
                                Update
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No items found in your wishlist.</p>
                )}
            </div>
        </div>

        {/* Update Modal */}
        {showUpdateModal && (
            <div style={styles.modal}>
                <div style={styles.modalContent}>
                    <h3>Update Item</h3>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="itemName"
                            value={updatedData.itemName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Description:
                        <input
                            type="text"
                            name="description"
                            value={updatedData.description}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={updatedData.price}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        URL:
                        <input
                            type="text"
                            name="url"
                            value={updatedData.url}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button onClick={handleUpdateSubmit} style={styles.saveButton}>Save</button>
                    <button onClick={() => setShowUpdateModal(false)} style={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        )}
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
    updateButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '5px 10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginLeft: '10px',
    },
    modal: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px',
    },
    cancelButton: {
        backgroundColor: '#f44336',
        color: '#fff',
        padding: '10px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default Wishlist;
