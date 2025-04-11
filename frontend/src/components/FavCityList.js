import React from "react";


export default function FavCityList({ cityList }) {
  return(
    <div className="py-3 px-3 row-start-2 col-start-2 justify-self-start self-start rounded-xl shadow-lg bg-gradient-to-r from-slate-400 to-gray-500">
      <h3>Favorite Cities</h3>
      <ul>{cityList}</ul>
    </div>
  );
}