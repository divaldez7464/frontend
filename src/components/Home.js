import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
function Home() {

    const navigate = useNavigate();
    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <button onClick={()=> navigate('/')}>  logout</button>
        </div>
    );
}

export default Home;