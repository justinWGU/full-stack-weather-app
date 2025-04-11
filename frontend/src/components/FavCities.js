import React, { useEffect } from "react";
import FavCityItem from "./FavCityItem";
import FavCityList from "./FavCityList";



export default function FavCities({ setFavCities, favCities, setWeatherData, token }) {
    // get user's fav cities, add them to a list, then display them
    
    async function getData() {
        const response = await fetch("http://localhost:8000/api/get-cities/", {
            method: "GET",
            headers: {"Content-Type": "application/json", "Authorization": `Token ${token}`}
        });
        const data = await response.json();
        setFavCities(data.cities);
    }

    useEffect(() => {
        getData();
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