import React, { useState } from "react";
import HourlyHour from "./HourlyHour";
import HourlyCondition from "./HourlyCondition";
import HourlyTemp from "./HourlyTemp";



export default function HourlyForecast() {
const [hourlyForecasts, setHourlyForecasts] = useState([]);

    
const fetchData = async () => {
    const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=e77503e6c87a4abf9eb203542242908&days=5&q=Riverside");
    const data = await response.json();
    const { forecast: { forecastday: forecastdays } } = data;

    const hourlyList = [];
    const hours = forecastdays[1].hour;
      for (let j = 0; j < hours.length; j++) {
        let time = hours[j].time;
        let temp = hours[j].temp_f;
        let src = hours[j].condition.icon;
        hourlyList.push({ time, temp, src });
      }

      setHourlyForecasts(hourlyList);
    }
  

  // useEffect(() => {
  //   fetchData();
  // }, [forecasts]);

  // create a variable to hold the JSX
  const hourlyForecastJSX = hourlyForecasts.map( (hour) => {      
    return (
      <div key={hour.time}>
        <HourlyHour time={hour.time}></HourlyHour>
        <HourlyCondition src={hour.src}></HourlyCondition>
        <HourlyTemp temp={hour.temp}></HourlyTemp>
      </div>
    );
  });

  return (
    <div className="row-start-3 col-start-3 col-end-4 p-3">
      <button onClick={fetchData}>Click</button>
      {hourlyForecastJSX}
    </div>
  );
}