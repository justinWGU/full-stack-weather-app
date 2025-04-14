import React from "react";
import { useNavigate } from "react-router-dom";
import WeatherItem from "./WeatherItem";
import WeatherButtons from "./WeatherButtons";

export default function CurrentWeather({
  token,
  setFavCities,
  favCities,
  weatherData,
}) {
  // Represents each weather instance.

  const cityList = [];
  for (const key in Object.keys(favCities)) {
    const item = favCities[key].city_name;
    cityList.push(item);
  }
  const navigate = useNavigate();

  if (weatherData) {
    // TODO: simplify destrucuture method of data prop
    const {
      location: { name: city, region: state, country },
      current: {
        temp_f: temp,
        wind_mph: wind,
        condition: { text: conditions, icon },
      },
    } = weatherData;

    const handleAddCity = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/add-city/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ city: city }),
        });
        const data = await response.json();
        const updatedCities = data.cities;
        setFavCities(updatedCities);
      } catch (err) {
        console.log("Fetch resolved with errors.", err);
      }
    };
    const handleRemoveCity = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/remove-city/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ city: city }),
        });
        const data = await response.json();
        const updatedCities = data.cities;
        setFavCities(updatedCities);
        navigate("/weather");
      } catch (err) {
        console.log("Fetch resolved with errors.", err);
      }
    };
    return (
      <div className="col-start-3 col-end-5 row-start-2  text-white px-3 py-3 rounded-xl shadow-2xl shadow-black bg-gradient-to-r from-blue-600 to-black">
        <h2>{temp}</h2>
        <h2>{city}</h2>
        <img src={icon} alt={conditions}></img>
        <WeatherItem label={"Wind"} data={wind} units={"mph"}></WeatherItem>
        <WeatherItem label={"Conditions"} data={conditions}></WeatherItem>
        <WeatherButtons
          currentCity={city}
          cityList={cityList}
          handleAddCity={handleAddCity}
          handleRemoveCity={handleRemoveCity}
        ></WeatherButtons>
      </div>
    );
  }
}
