import React from "react";
import { Outlet } from "react-router-dom";
import FavCities from "./FavCities";
import InputBox from "./InputBox";


export default function WeatherLayout({ setWeatherData, token }) {
  return (
    <div>
      <h1>WeatherLayout</h1>
      <FavCities setWeatherData={setWeatherData} token={token}></FavCities>
      <InputBox setWeatherData={setWeatherData} token={token}></InputBox>
      <Outlet></Outlet>
    </div>
  );
}