import React from "react";


const Register = ({ handleRegisterClick, changeLogIn, submitRegistration, username, password  }) => {
// Represents sign up page for first time users.


    return (
        <div>

            <h1>Sign up page</h1>
            <form onSubmit={submitRegistration}>
                <label>Enter username:</label>
                <input type="text" value={username || ""} name="username" onChange={changeLogIn}></input>
                <label>Enter password:</label>
                <input type="password" value={password || ""} name="password" onChange={changeLogIn}></input>
                <button type="submit" style={{display: "inline-block"}}>sign up</button>
            </form>

            <p>Already have an account?</p>
            <button onClick={handleRegisterClick}>Log in</button>
        </div>
    );
}

export default Register;