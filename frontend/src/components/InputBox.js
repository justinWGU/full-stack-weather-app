import React, { useState } from "react";
import '../css/style.css';
import { useNavigate } from "react-router-dom";


export default function InputBox ({ setData }) {
// Handles input box for entering city.

const navigate = useNavigate();
const [city, setCity] = useState(null);

  // Updates city input box.
  const handleChange = (event) => {
    const newCity = event.target.value;
    setCity(newCity);
  }

  // Queries city weather data and resets city input box. 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=e77503e6c87a4abf9eb203542242908&q=${city}`;
      const response = await fetch(url);
      const responseData = await response.json();
      setData(responseData);
      navigate(`/weather/${city}`);
    }
    catch (err) {
      console.error(`Error occurred while fetching data from weather api ${err}`);
    }
    finally {
      setCity(null);    
    }
  }

    return (
      <div>
        <div className="text-center">
            <form onSubmit={handleSubmit}>
            <div>
                <label className="col-form-label">Enter city name</label>
                <input className="form-text" type="text" value={city || ""} name="cityName" onChange={handleChange}></input>
            </div>
            <div className="city-button"> 
            <button className="btn btn-primary" type="submit">submit</button>
            </div>
            </form>
        </div>
        </div>
    );
}