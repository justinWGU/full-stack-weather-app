import React from "react";
import { useNavigate } from "react-router-dom";

// Ingests login info and authenticates with a backend.
const LogIn = ({ setIsRegistered, setToken, setUsername, setPassword, handleChange, username, password}) => {

  const navigate = useNavigate();

  // submits login information to backend for authentication.
  const handleSubmit = async (event) => {
      
    event.preventDefault();

      if (!username || !password) {
        alert("Username and password must both be entered.");
        return;
      }

    // send api request to django server to authenticate sign in info
    try {
      const response = await fetch("http://localhost:8000/api/signin/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
      });
      const data = await response.json();

      if (response.status === 400) {
        alert("No account with those credentials found.");
        throw new Error(`Fetch exited with http status code ${response.status}`);
        }
      
      navigate("/weather");
      console.log("Log in successful. Response \"ok\" from Django server.");
      setToken(data.token);  
    } 
    catch (err) {
      console.log("Fetch resolved with errors.", err);
    } 
    finally {
        setUsername(null);
        setPassword(null);
    }
  }

    return (
      <div className="bg-gray-100 max-h-full">
        <div className="max-w-sm mx-auto p-4 bg-white rounded-xl shadow-lg">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="block text-sm font-medium">Username</label>
                    <input className="block border-2 border-gray-400 rounded" type="text" value={username || ""} name="username" onChange={handleChange}></input>
                </div>
                <div className="mb-3">
                    <label className="block text-sm font-medium">Password</label>
                    <input className="block border-2 border-gray-400 rounded" type="password" value={password || ""} name="password" onChange={handleChange}></input>
                </div>
                <div className="mt-4">
                    <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" type="submit">submit</button>
                </div>
            </form>
            <div className="mt-4">
                <p className="text-sm font-medium">Need to create an account? <a href="" onMouseDown={() => setIsRegistered(false)}>Register here</a></p> 
            </div>
        </div>
      </div>
    );
}

export default LogIn;