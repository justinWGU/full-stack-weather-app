import React from "react";
import HourlyHour from "./HourlyHour";
import HourlyCondition from "./HourlyCondition";
import HourlyTemp from "./HourlyTemp";



export default function HourlyForecast() {
  return (
    <div className="row-start-3 col-start-3 col-end-4 border-2 border-red-600">
      <h3>Hourly Forecast</h3>
      <HourlyHour></HourlyHour>
      <HourlyCondition></HourlyCondition>
      <HourlyTemp></HourlyTemp>
      <HourlyHour></HourlyHour>
      <HourlyCondition></HourlyCondition>
      <HourlyTemp></HourlyTemp>
      <HourlyHour></HourlyHour>
      <HourlyCondition></HourlyCondition>
      <HourlyTemp></HourlyTemp>
    </div>
  );
}