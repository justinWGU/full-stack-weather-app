import React from "react";


const Weather = ({ data }) => {
// Represents each weather instance.

    // TODO: implement favorite & del button
    if (data) { 
        return (
            <div style={{paddingTop:"25px"}} className="grid text-center">
                <p>City: {data.location.name}</p>
                <p>State: {data.location.region}</p>
                <p>Country: {data.location.country}</p>
                <p>Temperature: {data.current.temp_f} farenheit</p>
                <p>Wind: {data.current.wind_mph} mph</p>
                <p>Conditions: {data.current.condition.text}</p>
                <img src={data.current.condition.icon} alt='img of conditions'></img>
                <div>
                    <button className="btn btn-primary">Favorite</button>
                    <button className="btn btn-danger">X</button>
                </div>
            </div>
        );
    }
}
export default Weather;
