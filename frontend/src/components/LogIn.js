import React from "react";
import '../css/style.css';

// Ingests login info and authenticates with a backend.
const LogIn = ({ handleClick, changeLogIn, submitLogIn, username, password}) => {

    return (
        <div className="text-center">
            <h1>Login</h1>
            <form onSubmit={submitLogIn}>
                <div>
                    <label className="form-text">Enter username</label>
                    <input className="form-text" type="text" value={username || ""} name="username" onChange={changeLogIn}></input>
                </div>
                <div>
                    <label className="form-text">Enter password</label>
                    <input className="form-text" type="password" value={password || ""} name="password" onChange={changeLogIn}></input>
                </div>
                <div className="submit-button">
                    <button className="btn btn-primary" type="submit">submit</button>
                </div>
            </form>
                <div className="route-button">
                    <p className="form-text">Need to create an account?</p>
                    <button className="btn btn-secondary" onClick={handleClick}>sign up</button> 
                </div>
        </div>
    );
}

export default LogIn;