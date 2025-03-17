import './App.css';
import React, { useState, useEffect } from 'react';
import InputBox from './InputBox.js';
import Weather from './Weather.js';
import LogIn from './LogIn.js';


const App = () => {
  // Main app that establishes core logic. 

  const [data, setData] = useState(null);
  const [city, setCity] = useState(null);
  const [isAuth, setAuth] = useState(false);

  const handleChange = (event) => {
    const newCity = event.target.value;
    setCity(newCity);
  }

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

  if (!sAuth) {
    return (
      <LogIn setAuth={setAuth}></LogIn>
    );
  }

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
