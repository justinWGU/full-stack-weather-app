import React from "react";
import FavCityList from "./FavCityList";
import CurrentWeather from "./CurrentWeather";
import SearchBarContainer from "./SearchBarContainer";


export default function WeatherContainer({ weatherData, setFavCities, favCities, setWeatherData, token }) {
  return (
    <div className="grid grid-cols-3">
      <SearchBarContainer setWeatherData={setWeatherData} token={token}></SearchBarContainer>
      <FavCityList setFavCities={setFavCities} favCities={favCities} setWeatherData={setWeatherData} token={token}></FavCityList>
      <CurrentWeather setFavCities={setFavCities} token={token} favCities={favCities} weatherData={weatherData}></CurrentWeather>
    </div>
  );
}