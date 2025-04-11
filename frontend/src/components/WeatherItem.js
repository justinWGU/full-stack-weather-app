import React from "react";


export default function WeatherItem({ label, data, units }) {
  return <p>{label} {data} {units? units:""}</p>;
}