import React, { useState } from "react";
import '../css/style.css';
import FavCities from "./FavCities";
import Weather from "./Weather";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";


const InputBox = ({ setToken, setData, data, token }) => { // not sure what the diff is when using '{}'
// Handles input box for entering city.

const navigate = useNavigate();

const [city, setCity] = useState(null);


  // Updates city input box.
  const handleChange = (event) => {
    const newCity = event.target.value;
    setCity(newCity);
  }


  // Queries city weather data and resets city input box. 
  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const url = `http://api.weatherapi.com/v1/current.json?key=e77503e6c87a4abf9eb203542242908&q=${city}`;
      fetch(url)
      .then(response => {
        if (response.ok) {
          navigate(`/weather/${city}`);
          const data = response.json();
          console.log(`Response "ok" from weather server, status: ${response.status}.`);
          console.log("Response data from weather server: ", data);
          return data; 
        }          
        else throw new Error(`Fetch exited with http status code ${response.status}.`);
      })
      .then(data => setData(data))
      .catch(errors => console.error("Promise resolved with errors:", errors));
    }
    catch {
        console.error("Promise rejected during fetch.")
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
        <Outlet />
        {/* {data&& <Weather data={data} token={token}></Weather>}
        {token&& <FavCities token={token}></FavCities>} */}
        </div>
    );
}

export default InputBox;