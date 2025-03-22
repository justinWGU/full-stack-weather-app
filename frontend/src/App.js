import './App.css';
import React, { useState } from 'react';
import InputBox from './components/InputBox.js';
import Weather from './components/Weather.js';
import LogIn from './components/LogIn.js';
import Register from './components/Register.js';
import FavCities from './components/FavCities.js';


// Main app that establishes core logic. 
const App = () => {

  const [data, setData] = useState(null);
  const [city, setCity] = useState(null);
  const [isAuth, setAuth] = useState(false);
  const [isRegistered, setRegistration] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);


  
  // submits form data to backend
  const submitRegistration = (event) => {
    
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
          console.log("Registration successful. Response \"ok\" from Django server.");
          setRegistration(true);
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

  // update username & pw as user types
  const changeLogIn = (event) => {
  
    const inputSource = event.target.name;
    const newInputValue = event.target.value;

    if (inputSource === "username") {
        setUsername(newInputValue);
    } else if (inputSource === "password") {
        setPassword(newInputValue);
    } else {
      setConfirmPassword(newInputValue);
    }
  }


  // submits login information to backend for authentication.
  const submitLogIn = (event) => {
      
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

  // Updates city input box.
  const handleChange = (event) => {
    const newCity = event.target.value;
    setCity(newCity);
  }

  // Queries city weather data and resets city input box. 
  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=e77503e6c87a4abf9eb203542242908&q=${city}`;
      fetch(url)
      .then(response => {
        if (response.ok) {
          const data = response.json();
          console.log(`Response "ok" from weather server, status: ${response.status}.`);
          console.log("Response data from weather server: ", data);
          return data; 
        }          
        else throw new Error(`Fetch exited with http status code ${response.status}.`);
      })
      .then(data => setData(data))
      .catch(errors => console.error("Promise resolved with errors:", errors));
    }
    catch {
        console.error("Promise rejected during fetch.")
    }
    finally {
      setCity(null);    
    }
  }

  // Handles button to navigate to registration page.
  const handleClick = (event) => {
    setPassword(null);
    setUsername(null);  
    setRegistration(false);
  }

  // Handles button to navigate back to login page.
  const handleRegisterClick = () => {
    setPassword(null);
    setUsername(null);  
    setRegistration(true);
  }

  // Uses state to determine if user needs to register.
  if (!isRegistered) {
    return (
    <Register handleRegisterClick={handleRegisterClick} username={username} password={password} confirmPassword={confirmPassword} changeLogIn={changeLogIn} submitRegistration={submitRegistration}></Register>
    );
  }

  // Uses state to determine if user only needs to login.
  if (!isAuth) {
    return (
      <LogIn handleClick={handleClick} changeLogIn={changeLogIn} submitLogIn={submitLogIn} token={token} username={username} password={password}></LogIn>
    );
  }


  // Displays user's three favorited cities plus queried city. 
  return (
    <div>
      <InputBox handleChange={handleChange} handleSubmit={handleSubmit} city={city}></InputBox>
      <Weather data={data} token={token}/> 
      <FavCities token={token}></FavCities>
    </div>    
  );
}

export default App;
