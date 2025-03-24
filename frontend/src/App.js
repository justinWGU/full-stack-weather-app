import './App.css';
import React, { useState } from 'react';
import InputBox from './components/InputBox.js';
import Weather from './components/Weather.js';
import LogIn from './components/LogIn.js';
import Register from './components/Register.js';
import FavCities from './components/FavCities.js';


// Main app that establishes core logic. 
const App = () => {
  const [isAuth, setAuth] = useState(false);
  const [isRegistered, setRegistration] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [data, setData] = useState(null);

    // update username & pw as user types
    const handleChange = (event) => {
  
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

  // Navigages to registration page.
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
    <Register handleRegisterClick={handleRegisterClick} setUsername={setUsername} setPassword={setPassword} setConfirmPassword={setConfirmPassword} username={username} password={password} confirmPassword={confirmPassword} changeLogIn={handleChange}></Register>
    );
  }

  // Uses state to determine if user only needs to login.
  if (!isAuth) {
    return (
      <LogIn handleChange={handleChange} handleClick={handleClick} setToken={setToken} setAuth={setAuth} setPassword={setPassword} setUsername={setUsername} token={token} username={username} password={password}></LogIn>
    );
  }


  // Displays user's three favorited cities plus queried city. 
  return (
    <div>
      <InputBox setData={setData}></InputBox>
      <Weather data={data} token={token}/> 
      <FavCities token={token}></FavCities>
    </div>    
  );
}

export default App;
