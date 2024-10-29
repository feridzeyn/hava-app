import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Chart from 'react-apexcharts';

const WeatherPage = () => {
  console.log("hello")
  const { city } = useParams();
  console.log(`sHERIN ADI: ${city}`);
  
  const [hourlyData, setHourlyData] = useState([]);
  const [forecastData, setForecastData] = useState([]);

  const API_KEY = 'bee597e2f4c0c24c218f0a97162fc5a7'; // OpenWeather API açarınızı buraya daxil edin
  console.log(API_KEY);
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // 3 saatlıq məlumatlar üçün sorğu
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        const data = response.data.list;

        // 3 saatlıq temperatur, rütubət və hava vəziyyəti məlumatlarını götürmək
        const hourlyTemps = data.map(item => item.main.temp);
        const hourlyHumidity = data.map(item => item.main.humidity);
        const hourlyDescriptions = data.map(item => item.weather[0].description);
        const hourlyTimes = data.map(item =>
          new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        );

        setHourlyData({
          temperature: { data: hourlyTemps, times: hourlyTimes },
          humidity: { data: hourlyHumidity, times: hourlyTimes },
          description: { data: hourlyDescriptions, times: hourlyTimes },
        });

        // 5 günlük proqnoz məlumatlarını saxlamaq
        const dailyForecast = data.filter((_, index) => index % 8 === 0).slice(0, 5);
        setForecastData(dailyForecast);

      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, [city]);

  return (
    <div>
      <h1>{city} Üzrə Hava Məlumatları</h1>
      <div>
        <h2>3 Saatlıq Proqnoz</h2>

        {/* Temperatur üçün ApexChart */}
        <Chart
          options={{
            chart: { type: 'area', height: 350 },
            xaxis: { categories: hourlyData.temperature?.times },
            title: { text: '3 Saatlıq Temperatur' },
            yaxis: { title: { text: '°C' } }
          }}
          series={[{ name: 'Temperature', data: hourlyData.temperature?.data }]}
          type="area"
          height={350}
        />

        {/* Rütubət üçün ApexChart */}
        <Chart
          options={{
            chart: { type: 'area', height: 350 },
            xaxis: { categories: hourlyData.humidity?.times },
            title: { text: '3 Saatlıq Rütubət' },
            yaxis: { title: { text: '%' } }
          }}
          series={[{ name: 'Humidity', data: hourlyData.humidity?.data }]}
          type="area"
          height={350}
        />

        {/* Hava vəziyyəti üçün ApexChart */}
        <Chart
          options={{
            chart: { type: 'area', height: 350 },
            xaxis: { categories: hourlyData.description?.times },
            title: { text: '3 Saatlıq Hava Vəziyyəti' },
            yaxis: { title: { text: 'Status' } },
            markers: {
              size: 4,
              colors: ['#FFA41B'],
              strokeColor: '#00E396',
              strokeWidth: 2,
            }
          }}
          series={[
            {
              name: 'Weather',
              data: hourlyData.description?.data.map(desc => {
                if (desc.includes("rain")) return 1;
                if (desc.includes("clear")) return 2;
                if (desc.includes("cloud")) return 3;
                return 0;
              })
            }
          ]}
          type="area"
          height={350}
        />
      </div>
       
      {/* 5 Günlük Hava Proqnozu Kartları */}
      <h2>5 Günlük Proqnoz</h2>
      <div className="forecast-cards">
        {forecastData.map((day, index) => (
          <div key={index} className="forecast-card">
            <h4>{new Date(day.dt * 1000).toLocaleDateString()}</h4>
            <p>Temperature: {day.main.temp}°C</p>
            <p>Humidity: {day.main.humidity}%</p>
            <p>Weather: {day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherPage;
