import React from "react";
import '../css/style.css';
import { useParams } from "react-router-dom";


export default function Weather({ weatherData }) {
// Represents each weather instance.

    const { id } = useParams();
    
    // TODO: implement favorite & del button 
    if (weatherData) { 
        // TODO: simplify destrucuture method of data prop
        const { location:{name: city, region: state, country},
                current:{temp_f: temp, wind_mph: wind, condition:{text: conditions, icon}} } = weatherData;

        return (
            <div className="grid text-center weather-div">
                <h4>{id}</h4>
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
    else {
        return (<h2>Data Empty</h2>);
    }
}