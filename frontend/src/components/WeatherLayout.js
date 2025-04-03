import React from "react";
import { Outlet } from "react-router-dom";
import FavCities from "./FavCities";
import InputBox from "./InputBox";


export default function WeatherLayout({ setData, token }) {
  return (
    <div>
      <h1>WeatherLayout</h1>
      <FavCities token={token}></FavCities>
      <InputBox setData={setData} token={token}></InputBox>
      <Outlet context={{test: "Hello world"}}></Outlet>
    </div>
  );
}