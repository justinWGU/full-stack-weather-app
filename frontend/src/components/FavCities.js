import React, { useState, useEffect } from "react";

export default function FavCities({ token }) {

    console.log("Token from fav cities: ", token)
    const[favCities, setFavCities] = useState([]);

    // get user's fav cities, add them to a list, then display them
    useEffect( () => {
    
        fetch("http://localhost:8000/api/get-cities/", {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": `Token ${token}`}
        })
        .then(response => {
            console.log("Response from http://localhost:8000/api/get-cities/: ", response);
            return response.json();
        })
        .then(data => {
            console.log("Fav city data: ", data.cities);
            setFavCities(data.cities)
        })
        .catch(error => console.error(error));
    }, []);

    const city_list = favCities.map(favCity => {
        return (
            <li key={favCity.id}>{favCity.city_name}</li>
        );
    });

    return (
        <div>
            <h3>Favorite Cities</h3>
            <ul>{city_list}</ul>
        </div>
    );
}