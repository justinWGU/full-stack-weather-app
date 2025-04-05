import React, { useState, useEffect } from "react";


export default function FavCities({ setFavCities, favCities, setWeatherData, token }) {


    // get user's fav cities, add them to a list, then display them
    useEffect( () => {
    
        fetch("http://localhost:8000/api/get-cities/", {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": `Token ${token}`}
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            setFavCities(data.cities);
        })
        .catch(error => console.error(error));
    }, []);

    const city_list = favCities.map(favCity => {
        return (
            <div key={favCity.id}>
            <li><button onClick={() => setWeatherData(favCity.city_name)} className="">{favCity.city_name}</button> </li>
            <hr className="text-white"></hr>
            </div>
        );
    });

    return (
        <div className="w-2/5 inline-block">
            <div className="py-3 px-3 ml-3 rounded-xl size-max shadow-lg bg-gradient-to-r from-slate-400 to-gray-500">
                <h3>Favorite Cities</h3>
                <ul>{city_list}</ul>
            </div>
        </div>
    );
}