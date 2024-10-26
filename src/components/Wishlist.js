import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'



import { Navigate, useNavigate, useNavigation } from 'react-router-dom';



const Wishlist = () => {
    const [items, setItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');


    const navigate = useNavigate();
   
        
   

    
    useEffect(() => {
        // const username = localStorage.getItem("username"); 
        // console.log("Username in Wishlist:", username); 
        const storedUserData = localStorage.getItem("userData");
        console.log("UserData in localStorage:", storedUserData);
        // const userData = localStorage.getItem("userData");
        // console.log('User data:', userData);
        // if (!userData) {
            
        //     setErrorMessage('You are not authorized. Please log in.');
        //     console.log("NO U R NOT")
        //     // navigate('/Login'); // Redirect to login if no user data is found
        //     // return;
        // }


        const fetchItems = async () => {
            const userData = localStorage.getItem("userData");
            if (userData) {
                const parsedData = JSON.parse(userData);
                console.log("Logged in user:", parsedData.username); 
            } else {
                console.log("No user is logged in");
            }
            try {
            //     const response = await fetch('https://project02-3bd6df9baeaf.herokuapp.com/api/items', {
            //         method: 'GET',
            //         credentials: 'include', // Ensure session/cookies are sent
            //     });
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
                    // const data = await response.json();
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
