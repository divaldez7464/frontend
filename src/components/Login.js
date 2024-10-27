// import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from 'react';
import { UserContext } from './test';

// import Cookies from "js-cookie";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    // const {setUsernameGlobal, setUserIdGlobal } = useContext(UserContext);


    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://project02-3bd6df9baeaf.herokuapp.com/api/users/login', {
                method: 'POST',
                credentials: 'include', // Include session cookies
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                
            });
            



            if (response.ok) {
                // const data = await response.json();

                // const data = await response.json();


                // const result = await response.text(); // Get the success message
                // setMessage("Login successful!");



                // localStorage.setItem("userData", JSON.stringify(data));


                const contentType = response.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    
                    const data = await response.json();
                    console.log("Login Response:", data); 
                    localStorage.setItem("userData", JSON.stringify(data));
                    
                    // localStorage.setItem("userData", JSON.stringify({
                    //     username: data.username,
                    //     user_id: data.user_id
                    // }));
                    setMessage("Login successful! with json");
                     navigate("/home");
                } else {
                    // Parse as plain text
                    const result = await response.text();
                    console.log(result);
                    setMessage("Login successful! with plain text");
                     navigate("/signup");
                }
    
                // navigate("/wishlist");
                
                // setUsernameGlobal(data.username);
                // setUserIdGlobal(data.user_id);
                // console.log(setUserIdGlobal);
                // console.log(setUsernameGlobal);
                // navigate("/wishlist");
                // console.log(result);
            } else {
                const errorMessage = await response.text();
                setMessage("Invalid username or password.");
                console.error("Login failed:", errorMessage);
            }
        } catch (error) {
            setMessage("Error logging in. Please try again.");
            console.error("Login error:", error);
        }
    };

    return (
    <div style={styles.background}>
        <div style={styles.page}>
            <div style={styles.container}>
                <h2>Login</h2>
                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputContainer}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                    <div style={styles.inputContainer}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>

                <div style={styles.buttonContainer}>
                    
                
                    <button type="submit" style={styles.loginButton}>Login</button>

                    <button onClick={() => navigate("/signup")} style={styles.signupButton}> Sign up</button>
                </div>
                </form>



                {message && <p>{message}</p>}
            </div>
        </div>
    </div>
    );
};

// Simple inline styles
const styles = {
    page: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
    },
    container: {
        width: "300px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
    },
    background: {
        height: "100vh",
        backgroundImage: `url('/src/Image/Blue Background.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    inputContainer: {
        marginBottom: "15px",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        width: "100%",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
    },
    loginButton: {
        padding: "10px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },

    signupButton: {
        padding: "10px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
};

export default Login;
