import React, { useState } from "react";


export default function InputBox ({ setWeatherData }) {
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
      <div className="ml-auto max-w-sm">
        <div className="text-center">
            <form onSubmit={handleSubmit}>
            <div >
                <label className="mr-2 text-xs font-medium">City name</label>
                <input className="mr-2 border-2 border-gray-400 rounded" type="text" value={city || ""} name="cityName" onChange={handleChange}></input>
                <button className="text-xs bg-blue-500 text-white font-bold py-.75 px-1 rounded hover:bg-blue-700" type="submit">submit</button>
            </div>
            </form>
        </div>
        </div>
    );
}