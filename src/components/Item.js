import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Item() {
    const navigate = useNavigate();
    
    // State to hold input values
    const [itemName, setItemName] = useState('');
    const [itemUrl, setItemUrl] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleAddItem = async () => {
        try {
            const response = await axios.post('/api/items', null, {
                params: {
                    userId: userId,
                    itemName: itemName,
                    url: itemUrl,
                    description: description,
                    price: price ? parseFloat(price) : undefined,
                },
            });

            console.log(response.data);
            // Optionally handle success (e.g., navigate or show a message)
            // Reset fields after adding
            setItemName('');
            setItemUrl('');
            setDescription('');
            setPrice('');
        } catch (error) {
            console.error('Error adding item:', error.response?.data || error.message);
            // Optionally handle error (e.g., show an error message)
        }
    };

    return (
        <div>
            <Navbar />
            <div className="Item-container">
                <h1>Item</h1>
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Item Name" 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="url" 
                        className="form-control" 
                        placeholder="Item URL" 
                        value={itemUrl} 
                        onChange={(e) => setItemUrl(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Price" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />
                </div>
                <button 
                    className="btn btn-primary" 
                    onClick={handleAddItem}
                >
                    Add Item
                </button>
            </div>
        </div>
    );
}

export default Item;
