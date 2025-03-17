import React, { useState } from "react";
import Register from "./Register";


const LogIn = ({ setAuth }) => {
    // Accepts login info and authenticates with a backend.

    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);

    const handleClick = (event) => {
        event.preventDefault();
        console.log("Sign up button is being clicked.");
        return <Register></Register>;
    }

    const handleChange = (event) => {
        
        const inputSource = event.target.name;
        const newInputValue = event.target.value;

        if (inputSource === "username") {
            setUsername(newInputValue);
        } else {
            setEmail(newInputValue);
        }
    }

    const handleSubmit = (event) => { // send to backend for authentication here
        event.preventDefault();
        console.log(`Username: ${username} and Email: ${email} submitted.`)
        setEmail(null);
        setUsername(null);
        
        // depending on server response change isAuth state
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter Username</label>
                <input type="text" value={username || ""} name="username" onChange={handleChange}></input>
                <label>Enter Email</label>
                <input type="text" value={email || ""} name="email" onChange={handleChange}></input>
                <button type="submit" onSubmit={handleSubmit} style={{display: "inline-block"}}>submit</button>
            </form>

            <p>Need to create an account?</p>
            <button onClick={handleClick}>Sign up</button> 
        </div>
    );
}

export default LogIn;