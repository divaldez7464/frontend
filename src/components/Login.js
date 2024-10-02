import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            navigate('/home');
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
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
        <div className="container d-flex flex-column align-items-center mt-5">
            <h2 className="mb-4">Login</h2>

            {profile ? (
                <div className="text-center">
                    <img src={profile.picture} alt="user" className="rounded-circle mb-3" />
                    <h3>User Logged In</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <button className="btn btn-danger mt-3" onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button className="btn btn-primary" onClick={() => login()}>Login with Google</button>
            )}
        </div>
    );
}

export default App;
