import React from "react";


export default function Register({ setIsRegistered, changeLogIn, setUsername, setConfirmPassword, setPassword, username, password, confirmPassword }) {
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
      <div className="bg-gray-100 max-h-full">
        <div className="max-w-sm mx-auto p-4 bg-white rounded-xl shadow-lg">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block text-sm font-medium">Username</label>
                    <input className="block border-2 border-gray-400 rounded" type="text" value={username || ""} name="username" onChange={changeLogIn}></input>
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium">Password</label>
                    <input className="block border-2 border-gray-400 rounded" type="password" value={password || ""} name="password" onChange={changeLogIn}></input>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Confirm password</label>
                    <input className="block border-2 border-gray-400 rounded" type="password" value={confirmPassword || ""} name="confirmPassword" onChange={changeLogIn}></input>
                </div>
                <div className="mb-3">
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" type="submit">submit</button>
                </div>
            </form>
            <div>
                <p className="text-sm font-medium">Already have an account? <a href="" onMouseDown={() => setIsRegistered(true)}> Log in</a></p>
            </div>
        </div>
      </div>
    );
}