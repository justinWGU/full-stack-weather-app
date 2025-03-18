import './App.css';
import React, { useState, useEffect } from 'react';
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

  // Updates city input box.
  const handleChange = (event) => {
    const newCity = event.target.value;
    setCity(newCity);
  }

  // Queries city weather data and resets city input box. 
  const handleSubmit = (event) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=e77503e6c87a4abf9eb203542242908&q=${city}`;

    event.preventDefault();
    console.log("Submitted!");

    fetch(url)
    .then(response => response.json())
    .then(json => setData(json))
    .catch(errors => console.error(errors));
    
    setCity(null);
  }

  // Handles button to navigate to registration page.
  const handleClick = (event) => {
    event.preventDefault();
    setRegistration(false);
}

  // Handles button to navigate back to login page.
  const handleRegisterClick = () => {
    setRegistration(true);
  }

  // Uses state to determine if user needs to register.
  if (isRegistered == false) {
    console.log("This logic is executing");
    return (
    <Register handleRegisterClick={handleRegisterClick}></Register>
    );
  }

  // Uses state to determine if user only needs to login.
  if (!isAuth) {
    return (
      <LogIn setAuth={setAuth} handleClick={handleClick}></LogIn>
    );
  }


  // Displays user's three favorited cities plus queried city. 
  return (
    <div>
      <InputBox handleChange={handleChange} handleSubmit={handleSubmit} city={city}></InputBox>
      <Weather data={data} /> 
      <Weather data={data} /> 
      <Weather data={data} />
    </div>    
  );
}

export default App;
