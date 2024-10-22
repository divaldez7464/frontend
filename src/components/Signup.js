import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async () => {
         if( password != confirmPassword){
            alert("passwords dont match");
            return;

         }

         try{
            // http://localhost:8080/api/user/add
            // 'https://project02-3bd6df9baeaf.herokuapp.com/api/user/add'
            const response = await axios.post('https://project02-3bd6df9baeaf.herokuapp.com/api/user/add', {
                username:username,
                password:password,
            });
            navigate('/home');
         }catch(error){
            console.log("error during signuo")
            alert("error")
         }




    };

 







    return (
        //mt-5 is bootstrap for spacing
        //
        <div className="container text-center mt-5">
            <h1 className="mb-4">Create an Account</h1>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Create Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}  />
            </div>
            
            <div className="mb-3">
                <label htmlFor="reenter-password" className="form-label">Re-enter Password</label>
                <input type="password" className="form-control" id="reenter-password" placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleSignup}>
                Sign Up </button>
        </div>
    );
}

export default Signup;