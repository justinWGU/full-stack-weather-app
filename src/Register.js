import React from "react";


const Register = ({ handleRegisterClick}) => {
// Represents sign up page for first time users.

    return (
        <div>
            <h1>Sign up page</h1>
            <p>Already have an account?</p>
            <button onClick={handleRegisterClick}>Log in</button>
        </div>
    );
}

export default Register;