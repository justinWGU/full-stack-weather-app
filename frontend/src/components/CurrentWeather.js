import React from "react";
import { useParams, useNavigate } from "react-router-dom";


export default function CurrentWeather({ token, setFavCities, favCities, weatherData }) {
// Represents each weather instance.

    const cityList = [];
    for (const key in Object.keys(favCities)) {
        const item = favCities[key].city_name;
        cityList.push(item);
    }
    const { id } = useParams();
    const navigate = useNavigate();


    if (weatherData) {
        // TODO: simplify destrucuture method of data prop
        const { location:{name: city, region: state, country},
                current:{temp_f: temp, wind_mph: wind, condition:{text: conditions, icon}} } = weatherData;

        const handleAddCity = async () => {
            try { 
                const response = await fetch("http://localhost:8000/api/add-city/", { method: "POST", headers: {'Content-Type': 'application/json','Authorization': `Token ${token}`},body: JSON.stringify({city: city})});
                const data = await response.json();
                const updatedCities = data.cities;
                setFavCities(updatedCities);
            }
            catch (err) {
                console.log("Fetch resolved with errors.", err);
            } 
        }
        const handleRemoveCity = async () => {
            
            try {
                const response = await fetch("http://localhost:8000/api/remove-city/", { method: "POST", headers: {'Content-Type': 'application/json','Authorization': `Token ${token}`},body: JSON.stringify({city: city})});
                const data = await response.json();
                const updatedCities = data.cities;
                setFavCities(updatedCities);
                navigate("/weather");
            }
            catch (err) {
                console.log("Fetch resolved with errors.", err);
            }
            
        }        
        return (
            <div className="col-start-2 col-end-4 row-start-2 justify-self-start text-white px-3 py-3 rounded-xl shadow-2xl shadow-black bg-gradient-to-r from-blue-600 to-black">
                <h4 className="mr-3 inline-block py-0 px-0">{id}</h4> 
                <img className="inline-block py-0 px-0" src={icon} alt='img of conditions'></img>
                <p>City: {city}</p>
                <p>State: {state}</p>
                <p>Country: {country}</p>
                <p>Temperature: {temp} farenheit</p>
                <p>Wind: {wind} mph</p>
                <p>Conditions: {conditions}</p>
                <div>
                    {!(cityList.includes(city))&&<button onClick={handleAddCity} className="btn btn-primary">Favorite</button>}
                    {cityList.includes(city)&&<button onClick={handleRemoveCity} className="btn btn-danger">X</button>}
                </div>
                <div>
           
                </div>
            </div>
        );
    }
}