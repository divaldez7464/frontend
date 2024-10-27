import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Item.css';

function Item({ userId }) {
    const navigate = useNavigate();

    // State to hold input values
    const [itemName, setItemName] = useState('');
    const [itemUrl, setItemUrl] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleAddItem = async () => {

        const storedUserData = localStorage.getItem("userData");
        console.log("UserData in localStorage:", storedUserData);
        try {

            console.log(JSON.stringify({
                item_name: itemName.trim(),
                url: itemUrl.trim(),
                description: description.trim(),
                price: price ? parseFloat(price) : null,
            }));


            const params = new URLSearchParams({
                item_name: itemName.trim(),
                url: itemUrl.trim(),
                description: description.trim(),
                price: price ? parseFloat(price) : null,
            });
         
            const response = await fetch(`https://project02-3bd6df9baeaf.herokuapp.com/api/items?${params.toString()}`, {
                method: 'POST',
                credentials: 'include', // Ensure credentials are sent
            });

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
        <div className="background">
            <Navbar />
            
        <div className="container mt-5">
            <h1 className="text-center mb-4">Add Item</h1>
            <div className="card">
                <div className="card-body">
                    <form>
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
                            type="button"
                            className="btn btn-primary w-100" 
                            onClick={handleAddItem}
                        >
                            Add Item
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Item;