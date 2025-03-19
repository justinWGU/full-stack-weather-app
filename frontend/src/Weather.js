import React from "react";


const Weather = ({ data }) => {
// Represents each weather instance.

    if (data) { 
        return (
            <div style={{display: "inline-block"}}>
                <p>Current city: {data.location.name}</p>
                <p>Current state: {data.location.region}</p>
                <p>Current country: {data.location.country}</p>
                <p>Current temp: {data.current.temp_f}</p>
                <p>Current condition: {data.current.condition.text}</p>
                <p>Current wind: {data.current.wind_mph}</p>
                <img src={data.current.condition.icon} alt='img of conditions'></img>
            </div>
        );
    }
}
export default Weather;
