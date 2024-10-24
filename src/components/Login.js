import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://project02-3bd6df9baeaf.herokuapp.com/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                credentials: 'include', // Include session cookies
            });

            if (response.ok) {
                const result = await response.text(); // Get the success message
                setMessage("Login successful!");
                navigate("/wishlist");
                console.log(result);
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

                <button type="submit" style={styles.button}>
                    Login
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

// Simple inline styles
const styles = {
    container: {
        width: "300px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
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
    button: {
        padding: "10px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
};

export default Login;
