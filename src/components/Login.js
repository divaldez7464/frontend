import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            navigate('/home');
        },
        onError: (error) => console.log('Login Failed:', error),
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json',
                    },
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    const logOut = () => {
        googleLogout();
        setProfile(null);
        setUser(null);
        navigate('/');
    };

    return (
        <div className="container mt-5">
            {/* <Navbar /> */}
            <h2 className="text-center">Login</h2>
            <br />
            {profile ? (
                <div className="text-center">
                    <h3>User Logged In</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <img src={profile.picture} alt="User" className="img-fluid rounded-circle mb-3" />
                    <button onClick={logOut} className="btn btn-danger">Log Out</button>
                </div>
            ) : (
                <div className="text-center">
                    <button onClick={() => login()} className="btn btn-primary mb-2">Login with Google</button>
                    <br />
                    <button onClick={() => navigate('/signup')} className="btn btn-secondary">Sign Up</button>
                </div>
            )}
        </div>
    );
}

export default Login;
