import React from "react";
import '../css/style.css';


const Register = ({ setIsRegistered, changeLogIn, setUsername, setConfirmPassword, setPassword, username, password, confirmPassword  }) => {
// Represents sign up page for first time users.

 
// submits form data to backend
const handleSubmit = (event) => {
    
    event.preventDefault();

    if (!username || !password || !confirmPassword) {
      alert("Username and password must both be entered.");
      return;
    }

    if (!(password === confirmPassword)) {
      alert("Passwords do not match");
      return;
    }
       
    // send api request to django server to authenticate sign up info
    try {
      fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        body: JSON.stringify({username: username, password: password}),
        headers: {'Content-Type': 'application/json'}    
      }) 
      .then(response => {
        if (response.ok) {
          setIsRegistered(true);
          console.log("Registration successful. Response \"ok\" from Django server.");
          return response.json();
        }
        else {
          if (response.status === 401) alert("Username is already taken.");
          throw new Error(`Fetch exited with http status code ${response.status}.`);
        }
      })
      .then(data => console.log("Response data: ", data))
      .catch(errors => console.error("Promise resolved with errors.", errors));
    } 
    catch {
      console.error("Promise rejected during fetch."); // catches network/CORS errors
    } 
    finally {
      setPassword(null);
      setUsername(null);  
      setConfirmPassword(null);
    }
  }   
    return (
        <div className="text-center">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
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
                <div className="submit-button">
                <button className="btn btn-primary" type="submit">submit</button>
                </div>
            </form>
            <div>
                <p className="form-text">Already have an account? <a href="" onMouseDown={() => setIsRegistered(true)}> Log in</a></p>
            </div>
        </div>
    );
}

export default Register;