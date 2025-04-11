import React, { useEffect } from "react";
import FavCityItem from "./FavCityItem";
import FavCityList from "./FavCityList";



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
    }, [setFavCities, token]);

    const cityList = favCities.map(favCity => {
        return (
            <FavCityItem key={favCity.id} setWeatherData={setWeatherData} favCity={favCity}></FavCityItem>
        );
    });

    return (
        <FavCityList cityList={cityList}></FavCityList>
    );
}