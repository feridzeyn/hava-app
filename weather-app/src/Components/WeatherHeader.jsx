import React, { useEffect, useState } from 'react'
import { cities } from '../Data/data';
import { useParams, useNavigate } from 'react-router-dom';
export default function WeatherHeader() {
  const[cityOption, setCityOption] = useState('')
const {cityName} = useParams();
const navigate = useNavigate();

    function goBack(){
        window.history.back(); 
    }
    useEffect(()=>{
    const data =  cities.map( 
        city=>(
      <option key={city} >{city}</option>
    ))
     
    
    setCityOption(data)
        
      }, [] )

      function handleChange(e){
navigate(`/weather/${e.target.value}`)
      }
  return (
    <div className='p-[25px] bg-[#111827] flex justify-between items-center'>
      <div>
<button onClick={goBack} className='text-white font-semibold text-[20px]'><i className="fa-solid fa-arrow-left mr-2"></i>Geri Qayıt</button>
</div>
<div>
 <select onChange={handleChange} value={cityName} className='bg-[#111827] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[140px] p-2.5 dark:bg-[#111827] dark:border-gray-600 dark:placeholder-[#111827] dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none'>
 {cityOption
 }
 </select>
</div>
    </div>
  )
}
