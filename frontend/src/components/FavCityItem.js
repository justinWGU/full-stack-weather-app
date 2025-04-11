import React from "react";

export default function FavCityItem({ setWeatherData, favCity }) {
  return (
    <div>
      <li><button onClick={() => setWeatherData(favCity.city_name)} className="">{favCity.city_name}</button></li>
      <hr className="text-white"></hr>
    </div>
  );
}