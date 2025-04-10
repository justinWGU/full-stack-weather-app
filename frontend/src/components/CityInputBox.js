import React, { useState } from "react";
import search_icon from '../images/search.png';


export default function CityInputBox ({ setWeatherData }) {
// Handles input box for entering city.

const [city, setCity] = useState(null);


  // Updates city input box.
  const handleChange = (event) => {
    const newCity = event.target.value;
    setCity(newCity);
  }

  // Queries city weather data and resets city input box. 
  const handleSubmit = (event) => {
    event.preventDefault();
    setWeatherData(city);
    setCity(null);
  }

    return (
            <form onSubmit={handleSubmit}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-950 px-3 py-3 rounded-xl flex gap-2 justify-end items-center mr-3">
                <input className="rounded-full py-1 px-1" type="text" value={city || ""} name="cityName" placeholder="Search city..." onChange={handleChange}></input>
                <img className="" src={search_icon} alt="Search Icon" width="25px"/>
            </div>
            </form>
    );
}