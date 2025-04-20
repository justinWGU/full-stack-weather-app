import React, { useState, useActionState } from 'react';
import search_icon from '../../../src/assets/search.png';

export default function CityInputBox({ setWeatherData }) {
  // Handles input box for entering city.

  const [city, setCity] = useState(null);

  // Updates city input box.
  const handleChange = (event) => {
    const newCity = event.target.value;
    setCity(newCity);
  };

  // Queries city weather data and resets city input box.
  const search = (any, formData) => {
    const test = { ayo: 'yuuur' };
    const cityName = formData.get('cityName');
    if (!cityName) {
      return {
        status: 'error',
        message: 'City must not be empty.',
      };
    }
    setWeatherData(cityName);
    setCity(null);
  };

  const [errMessage, searchAction] = useActionState(search, null);

  return (
    <form action={searchAction}>
      <div className='mt-4 text-red-600 text-sm font-bold'>
        {errMessage?.status === 'error' && <p>{errMessage.message}</p>}
      </div>
      <div className='bg-gradient-to-r from-blue-600 to-blue-950 px-3 py-3 rounded-xl flex gap-2 justify-end items-center mr-3'>
        <input
          className='rounded-full py-1 px-1'
          type='text'
          value={city || ''}
          name='cityName'
          placeholder='Search city...'
          onChange={handleChange}
        ></input>
        <input
          type='image'
          className='hover:cursor-pointer'
          src={search_icon}
          alt='Search Icon'
          width='25px'
          formAction={searchAction}
        ></input>
      </div>
    </form>
  );
}
