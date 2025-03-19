import './App.css';
import React, { useState } from 'react';
import InputBox from './InputBox.js';
import Weather from './Weather.js';
import LogIn from './LogIn.js';
import Register from './Register.js';


// Main app that establishes core logic. 
const App = () => {

  const [data, setData] = useState(null);
  const [city, setCity] = useState(null);
  const [isAuth, setAuth] = useState(false);
  const [isRegistered, setRegistration] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);


  // // effect to fetch user's fav cities
  // console.log("token being sent from weather: ", token);
  // useEffect ( () => {
  //   fetch("http://localhost:8000/api/privileged/", {
  //     header: {"Authorization": `Token ${token}`}
  //   })
  //   .then(response => response.json())
  //   .then(data => console.log("response from priv view: ", data))
  //   .catch(errors => console.error("errors: ", errors));
  // }, [])


  // submits form data to backend
  const submitRegistration = (event) => {
    event.preventDefault();
   
    try {
      fetch("http://localhost:8000/api/signup/", {
        method: "POST",
        body: JSON.stringify({username: username, password: password}),
        headers: {'Content-Type': 'application/json'}    
      }) 
      .then(response => {
        if (response.ok) {
          console.log(`Response "ok" from Django server, status ${response.status}`);
          setRegistration(true);
          return response.json();
        }
        else {
          if (response.status === 401) alert("Username is already taken.");
          throw new Error(`Fetch exited with http status code ${response.status}`);
        }
      })
      .then(data => console.log("Data: ", data))
      .catch(errors => console.error("Promise resolved with errors:", errors));
    }

    catch {
      console.error("Promise rejected during fetch."); // catches network/CORS errors
    }

    finally {
      setPassword(null);
      setUsername(null);  
    }
 
  }   

  const changeLogIn = (event) => {
        
    const inputSource = event.target.name;
    const newInputValue = event.target.value;

    if (inputSource === "username") {
        setUsername(newInputValue);
    } else {
        setPassword(newInputValue);
    }
  }


  // submits login information to backend for authentication.
  const submitLogIn = (event) => {
      event.preventDefault();
      console.log(`Username: ${username} and password submitted.`)

    try {

      fetch("http://localhost:8000/api/signin/", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
      })
      .then(response => {
        if (response.ok) {
          console.log(`Response "ok" from Django server, status: ${response.status}.`);
          return response.json(); 
        } 
        else {
          if (response.status === 400) alert("No account with those credentials found.");
          throw new Error(`Fetch exited with http status code ${response.status}`);
        }
      })
      .then(data => {
        console.log("response: ", data);
        if (data.token) setAuth(true);
        setToken(data.token);
      })
      .catch(errors => console.error("Promise resolved with errors:", errors));
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
          console.log(`Response "ok" from weather server, status: ${response.status}.`);
          return response.json(); 
        }          
        else throw new Error(`Fetch exited with http status code ${response.status}`);
      })
      .then(json => setData(json)) // try changing to data
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
    event.preventDefault();
    setRegistration(false);
  }

  // Handles button to navigate back to login page.
  const handleRegisterClick = () => {
    setRegistration(false);
  }

  // Uses state to determine if user needs to register.
  if (!isRegistered) {
    return (
    <Register handleRegisterClick={handleRegisterClick} setRegistration={setRegistration} username={username} password={password} changeLogIn={changeLogIn} submitRegistration={submitRegistration}></Register>
    );
  }

  // Uses state to determine if user only needs to login.
  if (!isAuth) {
    return (
      <LogIn setAuth={setAuth} handleClick={handleClick} changeLogIn={changeLogIn} submitLogIn={submitLogIn} setToken={setToken} token={token} username={username} password={password}></LogIn>
    );
  }


  // Displays user's three favorited cities plus queried city. 
  return (
    <div>
      <InputBox handleChange={handleChange} handleSubmit={handleSubmit} city={city}></InputBox>
      <Weather data={data} token={token}/> 
      <Weather data={data} token={token}/> 
      <Weather data={data} token={token}/> 
    </div>    
  );
}

export default App;
