import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignUp() {
    const navigate = useNavigate();

    return (
        //mt-5 is bootstrap for spacing
        //
        <div className="container text-center mt-5">
            <h1 className="mb-4">Create an Account</h1>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Create Username</label>
                <input type="text" className="form-control" id="username" placeholder="Enter username" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter password" />
            </div>
            <div className="mb-3">
                <label htmlFor="reenter-password" className="form-label">Re-enter Password</label>
                <input type="password" className="form-control" id="reenter-password" placeholder="Re-enter password" />
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/home')}>
                Sign Up </button>
        </div>
    );
}

export default SignUp;