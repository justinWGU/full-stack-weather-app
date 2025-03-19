import React from "react";

// Ingests login info and authenticates with a backend.
const LogIn = ({ handleClick, changeLogIn, submitLogIn, username, password}) => {

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={submitLogIn}>
                <label>Enter username:</label>
                <input type="text" value={username || ""} name="username" onChange={changeLogIn}></input>
                <label>Enter password:</label>
                <input type="password" value={password || ""} name="password" onChange={changeLogIn}></input>
                <button type="submit" style={{display: "inline-block"}}>submit</button>
            </form>

            <p>Need to create an account?</p>
            <button onClick={handleClick}>Sign up</button> 
        </div>
    );
}

export default LogIn;