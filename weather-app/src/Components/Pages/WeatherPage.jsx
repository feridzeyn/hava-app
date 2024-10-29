import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Chart from 'react-apexcharts';

import WeatherHeader from '../WeatherHeader';
import CurrentInfo from '../UI/CurrentInfo';
import { UpcomingDays } from '../../utilities/UpcomingDays';
import { getWeatherData } from '../../API/api';

const WeatherPage = () => {
  const { cityName } = useParams();
  const [forecastData, setForecastData] = useState([]);
  const [dayName, setDayName] = useState('')
  const [time, setTime] = useState('')
 const[defaultDay, setDefaultDay] = useState(0)

  useEffect(function getDayName() {

    {


      const date = new Date();
      const daysOfWeek = ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Cümə ertəsi"];
      const dayIndex = date.getDay();
      setDayName(daysOfWeek[dayIndex])

console.log(date);

      const hours = date.getHours().toString().padStart(2, '0')
      const minutes = date.getMinutes().toString().padStart(2, '0')
      setTime(`${hours}:${minutes}`)
    }
  }, [forecastData])

  


  // Dinamik qrafik seçimi üçün state
  const [selectedChart, setSelectedChart] = useState('temperature');

  const [temperatureChartData, setTemperatureChartData] = useState({
    series: [{ name: 'Temperature (°C)', data: [] }],
    options: {
      chart: { height: 350, type: 'area' },

      yaxis: { title: { text: 'Temperature (°C)' }, min: -10, max: 40 },
    },
  });

  const [humidityChartData, setHumidityChartData] = useState({
    series: [{ name: 'Humidity (%)', data: [] }],
    options: {
      chart: { height: 350, type: 'area' },
      xaxis: { categories: [] },
      yaxis: { title: { text: 'Humidity (%)' }, min: 0, max: 100 },
    },
  });

  const [windChartData, setWindChartData] = useState({
    series: [{ name: 'Wind (km/s)', data: [] }],
    options: {
      chart: { height: 350, type: 'area' },
      xaxis: { categories: [] },
      yaxis: { title: { text: 'Wind speed' } },
    },
  });

  const fetchWeatherData = async () => {
    try {

      const forecastResponse = await getWeatherData(cityName)
      // console.log(forecastResponse);
    

      const dailyForecast = forecastResponse.data.list.filter(reading =>
        reading.dt_txt.includes("12:00:00")
      );
      setForecastData(dailyForecast);
      console.log(dailyForecast);

      const temperatures = dailyForecast.map(data => data.main.temp);
      const humidities = dailyForecast.map(data => data.main.humidity);
      const weatherDescriptions = dailyForecast.map(data => data.wind.speed);
      const dates = dailyForecast.map(data =>
        new Date(data.dt_txt).toLocaleDateString()
      );

      setTemperatureChartData({
        series: [{ name: 'Temperature (°C)', data: temperatures }],
        options: {
          ...temperatureChartData.options,
          xaxis: { categories: dates },
        },
      });

      setHumidityChartData({
        series: [{ name: 'Humidity (%)', data: humidities }],
        options: {
          ...humidityChartData.options,
          xaxis: { categories: dates },
        },
      });

      setWindChartData({
        series: [{ name: 'Weather Description', data: weatherDescriptions }],
        options: {
          ...windChartData.options,
          xaxis: { categories: dates },
        },
      });
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  useEffect(() => {

    fetchWeatherData()

  }, [cityName]);

  // Seçilmiş qrafik növünə görə render
  const renderChart = () => {
    switch (selectedChart) {
      case 'humidity':
        return <Chart options={humidityChartData.options} series={humidityChartData.series} type="line" height={350} />;
      case 'weather':
        return <Chart options={windChartData.options} series={windChartData.series} type="line" height={350} />;
      case 'temperature':
      default:
        return <Chart options={temperatureChartData.options} series={temperatureChartData.series} type="area" height={350} />;
    }
  };
const selectDay = (index)=>{
setDefaultDay(index)
}
  return (
    <div className='bg-[#283042]'>
      <WeatherHeader />
      <div className="container p-5">
        <CurrentInfo forecastData={forecastData} cityName={cityName} dayName={dayName} time={time} defaultDay={defaultDay} />

        <div className="chart-controls text-white mb-[50px] mt-14">
          <button className='mr-3' onClick={() => setSelectedChart('temperature')}>Temperatur</button>
          <button className='mr-3' onClick={() => setSelectedChart('humidity')}>Rütubət</button>
          <button className='mr-3' onClick={() => setSelectedChart('weather')}>Külək</button>
          <button onClick={() => setSelectedChart('weather')}>Hiss edilən</button>
        </div>

        <div className="chart">
          {renderChart()}
        </div>

        <div className="forecast flex justify-between">
          {forecastData.map((day, index) => (


            <button onClick={()=>selectDay(index)} key={index} className={defaultDay===index&& 'active'}>
              {index === 0 ? <h3 className='text-white'>{dayName}</h3> : <h3 className='text-white'>{UpcomingDays()[index - 1]}</h3>}


              <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="Weather icon" />
              <h4>{Math.round(day.main.temp_max)}/{Math.round(day.main.temp_min)}</h4>



            </button>
          ))}

        </div>
      </div>
    </div>
  );
};


export default WeatherPage;




