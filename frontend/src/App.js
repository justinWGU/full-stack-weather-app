import './App.css';
import React, { useState } from 'react';
import LogIn from './pages/Login/LogIn.js';
import Register from './pages/Signup/Register.js';
import NotFound from './pages/NotFound/NotFound.js';
import { Routes, Route } from 'react-router-dom';
import useToken from './hooks/useToken.js';
import useUpdateWeather from './hooks/useUpdateWeather.js';
import Profile from './pages/Profile/Profile.js';
import WeatherContainer from './pages/Weather/WeatherContainer.js';
import Nav from './components/Nav.js';
import { ErrorBoundary } from 'react-error-boundary';
import FallBack from './pages/FallBack.js';

export default function App() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [favCities, setFavCities] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);

  // update username & pw as user types
  const handleChange = (event) => {
    const inputSource = event.target.name;
    const newInputValue = event.target.value;

    if (inputSource === 'username') {
      setUsername(newInputValue);
    } else if (inputSource === 'password') {
      setPassword(newInputValue);
    } else {
      setConfirmPassword(newInputValue);
    }
  };

  // Uses state to determine if user only needs to login.
  const { token, setToken, resetToken } = useToken('');
  const { weatherData, setWeatherData } = useUpdateWeather('');
  console.log('token: ', token);

  // control whether user should login or register
  if (!token && !isRegistered) {
    return (
      <Register
        setIsRegistered={setIsRegistered}
        setUsername={setUsername}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        username={username}
        password={password}
        confirmPassword={confirmPassword}
        changeLogIn={handleChange}
      ></Register>
    );
  } else if (!token) {
    return (
      // fallback={<div>An unexpected error ocurred</div>}
      <ErrorBoundary FallbackComponent={FallBack}>
        <LogIn
          setIsRegistered={setIsRegistered}
          handleChange={handleChange}
          setToken={setToken}
          setPassword={setPassword}
          setUsername={setUsername}
          token={token}
          username={username}
          password={password}
        ></LogIn>
      </ErrorBoundary>
    );
  }

  // Displays user's three favorited cities plus queried city.
  return (
    <div>
      <Routes>
        <Route element={<Nav></Nav>}>
          <Route
            path="/weather"
            element={
              <WeatherContainer
                weatherData={weatherData}
                setFavCities={setFavCities}
                favCities={favCities}
                setWeatherData={setWeatherData}
                token={token}
              ></WeatherContainer>
            }
          ></Route>
        </Route>
        <Route
          path="/profile"
          element={<Profile resetToken={resetToken} />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}
