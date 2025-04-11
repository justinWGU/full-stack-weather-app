import React from 'react';   
import CityInputBox from './CityInputBox.js';


export default function SearchBarContainer( { setWeatherData, token }) {
  return (
    <div className='row-start-2 col-end-6 flex justify-end'>
      <CityInputBox setWeatherData={setWeatherData} token={token}></CityInputBox>
    </div>
  );
}