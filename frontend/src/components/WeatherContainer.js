import React from "react";
import FavCities from "./FavCities";
import CurrentWeather from "./CurrentWeather";
import SearchBarContainer from "./SearchBarContainer";
import HourlyForecast from "./HourlyForecast";
import DailyForecast from "./DailyForecast";
import UVIndex from "./UVIndex";


export default function WeatherContainer({ weatherData, setFavCities, favCities, setWeatherData, token }) {
  return (
    <div className="grid grid-cols-6">
      <SearchBarContainer setWeatherData={setWeatherData} token={token}></SearchBarContainer>
      <FavCities setFavCities={setFavCities} favCities={favCities} setWeatherData={setWeatherData} token={token}></FavCities>
      <CurrentWeather setFavCities={setFavCities} token={token} favCities={favCities} weatherData={weatherData}></CurrentWeather>
      <HourlyForecast></HourlyForecast>
      <DailyForecast></DailyForecast>
      <UVIndex></UVIndex>
    </div>
  );
}