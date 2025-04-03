import React, { useState, useEffect } from "react";


export default function FavCities({ setWeatherData, token }) {

    const [favCities, setFavCities] = useState([]);


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
            setFavCities(data.cities)
        })
        .catch(error => console.error(error));
    }, []);

    const city_list = favCities.map(favCity => {
        return (
            <div key={favCity.id}>
            <li className="inline"><button onClick={() => setWeatherData(favCity.city_name)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">{favCity.city_name}</button> </li>
            </div>
        );
    });

    return (
        <div >
            <h3>Favorite Cities</h3>
            <ul>{city_list}</ul>
        </div>
    );
}