import React from 'react';
import FavCities from './favcities/FavCities';
import CurrentWeather from './weather/CurrentWeather';
import SearchBarContainer from './SearchBarContainer';
import { ErrorBoundary } from 'react-error-boundary';
import FallBack from '../FallBack';

export default function WeatherContainer({
  weatherData,
  setFavCities,
  favCities,
  setWeatherData,
  token,
}) {
  return (
    <div className='grid grid-cols-6'>
      <ErrorBoundary FallbackComponent={FallBack}>
        <SearchBarContainer
          setWeatherData={setWeatherData}
          token={token}
        ></SearchBarContainer>
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={FallBack}>
        <FavCities
          setFavCities={setFavCities}
          favCities={favCities}
          setWeatherData={setWeatherData}
          token={token}
        ></FavCities>
      </ErrorBoundary>
      <CurrentWeather
        setFavCities={setFavCities}
        token={token}
        favCities={favCities}
        weatherData={weatherData}
      ></CurrentWeather>
      {/* <HourlyForecast></HourlyForecast>
      <DailyForecast></DailyForecast>
      <UVIndex></UVIndex> */}
    </div>
  );
}
