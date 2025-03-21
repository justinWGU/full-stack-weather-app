import React from "react";


const Register = ({ handleRegisterClick, changeLogIn, submitRegistration, username, password, confirmPassword  }) => {
// Represents sign up page for first time users.

    return (
        <div className="text-center">
            <h1>Sign Up</h1>
            <form onSubmit={submitRegistration}>
                <div>
                    <label className="form-text">Enter username</label>
                    <input className="form-text" type="text" value={username || ""} name="username" onChange={changeLogIn}></input>
                </div>
                <div>
                    <label className="form-text">Enter password</label>
                    <input className="form-text" type="password" value={password || ""} name="password" onChange={changeLogIn}></input>
                </div>
                <div>
                    <label className="form-text">Confirm password</label>
                    <input className="form-text" type="password" value={confirmPassword || ""} name="confirmPassword" onChange={changeLogIn}></input>
                </div>
                <div style={{paddingTop:"10px"}}>
                <button className="btn btn-primary" type="submit" style={{display: "inline-block"}}>submit</button>
                </div>
            </form>
            <div style={{paddingTop:"15px"}}>
                <p className="form-text">Already have an account?</p>
                <button className="btn btn-secondary" onClick={handleRegisterClick}>log in</button>
            </div>
        </div>
    );
}

export default Register;