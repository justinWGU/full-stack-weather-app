import React from 'react';   
import CityInputBox from './CityInputBox.js';


export default function SearchBarContainer( { setWeatherData, token }) {
  return (
    <div className='col-end-4 flex justify-end'>
      <CityInputBox setWeatherData={setWeatherData} token={token}></CityInputBox>
    </div>
  );
}