import React, { useState } from "react";

// Ingests login info and authenticates with a backend.
const LogIn = ({ handleClick }) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);


    const handleChange = (event) => {
        
        const inputSource = event.target.name;
        const newInputValue = event.target.value;

        if (inputSource === "username") {
            setUsername(newInputValue);
        } else {
            setPassword(newInputValue);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username} and password submitted.`)

        
        // depending on server response change isAuth state
        // if (response !=== goo) {
        //     alert("Username and password not found.")
        // } else {
        //     setAuth(true);
        // }

        setPassword(null);
        setUsername(null);

        }

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter username:</label>
                <input type="text" value={username || ""} name="username" onChange={handleChange}></input>
                <label>Enter password:</label>
                <input type="password" value={password || ""} name="password" onChange={handleChange}></input>
                <button type="submit" onSubmit={handleSubmit} style={{display: "inline-block"}}>submit</button>
            </form>

            <p>Need to create an account?</p>
            <button onClick={handleClick}>Sign up</button> 
        </div>
    );
}

export default LogIn;