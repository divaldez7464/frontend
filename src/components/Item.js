import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Item({ userId }) {
    const navigate = useNavigate();

    // State to hold input values
    const [itemName, setItemName] = useState('');
    const [itemUrl, setItemUrl] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleAddItem = async () => {
        try {
            const response = await fetch('https://project02-3bd6df9baeaf.herokuapp.com/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    itemName,
                    url: itemUrl,
                    description,
                    price: price ? parseFloat(price) : undefined,
                }),
            })

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Show success alert
            alert('Item added successfully!');

            // Reset fields after adding
            setItemName('');
            setItemUrl('');
            setDescription('');
            setPrice('');
        } catch (error) {
            console.error('Error adding item:', error.message);
            alert('Error adding item. Please try again.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="Item-container">
                <h1>Add Item</h1>
                <div className="mb-3">
                    {/* sets item name below */}
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Item Name" 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)} 
                    />
                </div>
                {/* sets url below */}
                <div className="mb-3">
                    <input 
                        type="url" 
                        className="form-control" 
                        placeholder="Item URL" 
                        value={itemUrl} 
                        onChange={(e) => setItemUrl(e.target.value)} 
                    />
                </div>
                {/* sets description below */}
                <div className="mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                {/* Sets price below */}
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