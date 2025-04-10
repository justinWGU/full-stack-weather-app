import { useState } from "react";


export default function useUpdateWeather() {
  const [ weatherData, setWeatherData ] = useState("");

  const UpdateWeatherData = async (city) => {   // accept city
    // fetch data
    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=e77503e6c87a4abf9eb203542242908&q=${city}`;
      const response = await fetch(url);
      const responseData = await response.json();
      setWeatherData(responseData); // update state
    }
    catch (err) {
      console.error(`Error occurred while fetching data from weather api ${err}`);
    }
  }

  return { weatherData, setWeatherData: UpdateWeatherData };

}