import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {
        // Ensure the password and confirmPassword match
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        try {
            // Sending a POST request to your Spring Boot backend with username and password
            // const response = await axios.post('https://project02-3bd6df9baeaf.herokuapp.com/api/users/newuser', {
            
            //         username: username,
            //         password: password
                
            // });
            const response = await fetch('https://project02-3bd6df9baeaf.herokuapp.com/api/users/newuser',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,

                    }),

            })
            const data = await response.json();
            console.log(data);
           
            if (response.status === 201) {
                navigate('/home');
            }
        } catch (error) {
            
            console.error("Error during signup:", error);
            alert("Error during signup");
        }
    };

    return (
        <div className="container text-center mt-5">
            <h1 className="mb-4">Create an Account</h1>

            {/* Username input */}
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Create Username</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="username" 
                    placeholder="Enter username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
            </div>

            {/* Password input */}
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    placeholder="Enter password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>

            {/* Confirm Password input */}
            <div className="mb-3">
                <label htmlFor="reenter-password" className="form-label">Re-enter Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    id="reenter-password" 
                    placeholder="Re-enter password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
            </div>

            {/* Signup Button */}
            <button className="btn btn-primary" onClick={handleSignup}>
                Sign Up
            </button>
        </div>
    );
}

export default Signup;
