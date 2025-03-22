import React from "react";
import '../css/style.css';

const Weather = (data) => {
// Represents each weather instance.

    // TODO: implement favorite & del button
    if (data) { 
        
        // TODO: simplify destrucuture method of data prop
        const { location:{name: city, region: state, country, temp_f: temp},
                current:{wind_mph: wind, condition:{text: conditions, icon}} } = data;
        return (
            <div className="grid text-center weather-div">
                <p>City: {city}</p>
                <p>State: {state}</p>
                <p>Country: {country}</p>
                <p>Temperature: {temp} farenheit</p>
                <p>Wind: {wind} mph</p>
                <p>Conditions: {conditions}</p>
                <img src={icon} alt='img of conditions'></img>
                <div>
                    <button className="btn btn-primary">Favorite</button>
                    <button className="btn btn-danger">X</button>
                </div>
            </div>
        );
    }
}
export default Weather;
