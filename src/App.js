import './App.css';
import React, { useState, useEffect } from 'react';
import InputBox from './InputBox.js';
import Weather from './Weather.js';


// const Test = () => {
//   const [test, setTest] = useState([null]);

//   const handleClick = (event) => {
//     event.preventDefault();

//     fetch("http://127.0.0.1:8000/core/register/", {method: 'POST'})
//     .then(response => response.json())
//     .then(json => setTest(json))
//     .catch(errors => console.error(errors));
//   }

//   return (
//     <div>
//     <p>Test data: {test.username} {test.password}</p>
//     <button onClick={handleClick}>Test Button</button>
//     </div>
//   );
// }

const App = () => {
  const [data, setData] = useState(null);
  const [city, setCity] = useState(null);
  const [isAuth, setAuth] = useState(null);

  // useEffect(() => {
  //   fetch(url)
  //   .then(response => response.json())
  //   .then(json => setData(json))
  //   .catch(errors => console.error(errors))
  // }, []);

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

  if (!isAuth) {
    return (
      <Authenticate></Authenticate>
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
