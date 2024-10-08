
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [ user, setUser ] = useState([null]);
    const [ profile, setProfile ] = useState([null]);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {setUser(codeResponse)
            navigate('/home');},
        onError: (error) => console.log('Login Failed:', error)
        
    });

    useEffect(
        () => {
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
        },
        [ user ]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
        setUser(null);
        navigate('/');
    };

    // if(user){
    //     return <Navigate to="/home" replace/>;
    // }
    return (
        <div>
            <h2>Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    {/* <img src={profile.picture} alt="user image" /> */}
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) 
            : (
                <div>
                <button onClick={() => login()}>Login in with Google</button>
                <button onClick={() => navigate('/signup')}>Sign Up</button>
                </div>
            )}
            <button onClick={() => login()}>Login in with Google</button>


        </div>
    );
}
export default Login;