import React from "react";


export default function WeatherButtons({ cityList, currentCity, handleAddCity, handleRemoveCity }) {
  return (
    <div>
      {!(cityList.includes(currentCity))&&<button onClick={handleAddCity} className="btn btn-primary">Favorite</button>}
      {cityList.includes(currentCity)&&<button onClick={handleRemoveCity} className="btn btn-danger">X</button>}
    </div>
  );
}