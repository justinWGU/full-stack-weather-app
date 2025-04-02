import './App.css';
import React, { useState } from 'react';
import InputBox from './components/InputBox.js';
import LogIn from './components/LogIn.js';
import Register from './components/Register.js';
import Weather from './components/Weather.js';
import FavCities from './components/FavCities.js';
import NotFound from "./components/NotFound.js";
import { Routes, Route } from 'react-router-dom';
import useToken from './hooks/useToken.js';
import Profile from './components/Profile.js';



// Main app that establishes core logic.     
const App = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [data, setData] = useState(null);
  const [isRegistered, setIsRegistered]= useState(false);


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
  const { token, setToken, resetToken } = useToken("");
  console.log("token: ", token);

  // control whether user should login or register
  if (!token && !isRegistered) {
    return <Register setIsRegistered={setIsRegistered} setUsername={setUsername} setPassword={setPassword} setConfirmPassword={setConfirmPassword} username={username} password={password} confirmPassword={confirmPassword} changeLogIn={handleChange} />;
  }
  else if (!token) {
    return <LogIn setIsRegistered={setIsRegistered} handleChange={handleChange} setToken={setToken} setPassword={setPassword} setUsername={setUsername} token={token} username={username} password={password} />;
  }

  // Displays user's three favorited cities plus queried city. 
  return (
    <div>
      <Routes>
        <Route path="/weather" element={<InputBox setToken={setToken} setData={setData} data={data} token={token} />}> {/* Component drilling */}
          <Route index element={<FavCities token={token} />}></Route>
          <Route path=":id" element={<Weather data={data} token={token} />}></Route>
        </Route>
        <Route path="/profile" element={<Profile resetToken={resetToken}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>    
  );
}

export default App;
