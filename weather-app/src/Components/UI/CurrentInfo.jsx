import React from 'react'


export default function CurrentInfo({forecastData, cityName, dayName, time, defaultDay}) {

  return (
    <div>
{forecastData[0] && (


<div>
  <div className='flex justify-between items-center text-center	'>
    <div className='flex items-center'>

      <img src={`https://openweathermap.org/img/wn/${forecastData[defaultDay].weather[0].icon}@2x.png`} />
      <h5 className='text-white font-semibold text-[20px] ml-2'>{Math.round(forecastData[defaultDay].main.temp)}°C</h5>

    </div>

    <div>
      <h1 className='text-white text-[26px] font-semibold'>{cityName}</h1>
      <h3 className='text-[#7d828c] font-semibold'> {dayName} - {time}</h3>

      <h5 className='text-[#7d828c] font-semibold'>{forecastData[defaultDay].weather[0].description}</h5>

    </div>

  </div>

</div>
)}

    </div>
  )
}
