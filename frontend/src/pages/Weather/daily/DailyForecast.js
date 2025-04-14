import React, { useEffect, useState } from "react";
import DailyWeekday from "./DailyWeekday";
import DailyCondition from "./DailyCondition";
import DailyTemp from "./DailyTemp";


export default function DailyForecast() {

  const [forecasts, setForecasts] = useState([]);

    const fetchData = async () => {
    const response = await fetch("http://api.weatherapi.com/v1/forecast.json?key=e77503e6c87a4abf9eb203542242908&days=5&q=Riverside");
    const data = await response.json();
    const { forecast: { forecastday: forecastdays } } = data;
    console.log(data);
    const forecastList = [];
    for (let i = 0; i < forecastdays.length; i++) {
      const date = forecastdays[i].date;
      const max = forecastdays[i].day.maxtemp_f;
      const min = forecastdays[i].day.mintemp_f;
      const src = forecastdays[i].day.condition.icon;
      forecastList.push({ date, max, min, src });
    }
    setForecasts(forecastList);
  }

  // useEffect(() => {
  //   fetchData();
  // }, [forecasts]);

  // create a variable to hold the JSX for all three forecasts
  const forecastJSX = forecasts.map( (day) => {      
    return (
      <div key={day.date}>
      <DailyWeekday date={day.date}></DailyWeekday>
      <DailyCondition src={day.src}></DailyCondition>
      <DailyTemp high={day.max} low={day.min}></DailyTemp>
      </div>
    );
  });
 
  // render out the list of jsx
  return (
    <div className="row-start-3 col-start-4 col-end-5">
      {forecastJSX}
      <button onClick={fetchData}>Click</button>
    </div>
  );
}