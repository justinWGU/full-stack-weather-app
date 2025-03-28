import './App.css';
import React, { useState } from 'react';
import InputBox from './components/InputBox.js';
import LogIn from './components/LogIn.js';
import Register from './components/Register.js';
import Weather from './components/Weather.js';
import FavCities from './components/FavCities.js';
import NotFound from "./components/NotFound.js";
import Nav from "./components/Nav.js";
import { Routes, Route, Link } from 'react-router-dom';



// Main app that establishes core logic.     
const App = () => {
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

  // Uses state to determine if user only needs to login.
  if (!token) {
    return (
      <LogIn handleChange={handleChange} setToken={setToken} setPassword={setPassword} setUsername={setUsername} token={token} username={username} password={password}></LogIn>
    );
  }

  // Displays user's three favorited cities plus queried city. 
  return (
    <div>
      <Nav></Nav>
      <Routes>
        <Route path="/weather" element={<InputBox setToken={setToken} setData={setData} data={data} token={token} />}> {/* Component drilling */}
          <Route index element={<FavCities token={token} />}></Route>
          <Route path=":id" element={<Weather data={data} token={token} />}></Route>
        </Route>
        <Route path="/register" element={<Register setUsername={setUsername} setPassword={setPassword} setConfirmPassword={setConfirmPassword} username={username} password={password} confirmPassword={confirmPassword} changeLogIn={handleChange} />} />
        <Route path="/login" element={<LogIn handleChange={handleChange} setToken={setToken} setPassword={setPassword} setUsername={setUsername} token={token} username={username} password={password} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>    
  );
}

export default App;
