import React from "react";
import { Outlet } from "react-router-dom";
import FavCities from "./FavCities";
import InputBox from "./InputBox";


export default function WeatherLayout({ setFavCities, favCities, setWeatherData, token }) {
  return (
    <div className="">
      <InputBox setWeatherData={setWeatherData} token={token}></InputBox>
        <FavCities setFavCities={setFavCities} favCities={favCities} setWeatherData={setWeatherData} token={token}></FavCities>
      <Outlet></Outlet>
    </div>
  );
}