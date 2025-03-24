import React from "react";
import '../css/style.css';

// Ingests login info and authenticates with a backend.
const LogIn = ({ setAuth, setToken, setUsername, setPassword, handleClick, handleChange, username, password}) => {

  // submits login information to backend for authentication.
  const handleSubmit = (event) => {
      
    event.preventDefault();

      if (!username || !password) {
        alert("Username and password must both be entered.");
        return;
      }

    // send api request to django server to authenticate sign in info
    try {
      fetch("http://localhost:8000/api/signin/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
      })
      .then(response => {
        if (response.ok) {
          console.log("Log in successful. Response \"ok\" from Django server.");
          return response.json(); 
        } 
        else {
          if (response.status === 400) alert("No account with those credentials found.");
          throw new Error(`Fetch exited with http status code ${response.status}`);
        }
      })
      .then(data => {
        console.log("Response data: ", data); // This should return a token.
        if (data.token) setAuth(true);
        setToken(data.token);
      })
      .catch(errors => console.error("Promise resolved with errors.", errors));
    } 
    catch {
        console.error("Promise rejected during fetch."); // catches network/CORS errors
    } 
    finally {
        setUsername(null);
        setPassword(null);
        setToken(null);
    }
  }

    return (
        <div className="text-center">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-text">Enter username</label>
                    <input className="form-text" type="text" value={username || ""} name="username" onChange={handleChange}></input>
                </div>
                <div>
                    <label className="form-text">Enter password</label>
                    <input className="form-text" type="password" value={password || ""} name="password" onChange={handleChange}></input>
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