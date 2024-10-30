import axios from 'axios';
// export async function getData(cityName) {
//     const API_KEY = "bee597e2f4c0c24c218f0a97162fc5a7";
//     const BASE_URL = "https://api.openweathermap.org/data/2.5";

//     let response = await fetch(`${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units='metric'`)

//     let result = await response.json()
//     console.log(result)
   
// }


export const getWeatherData = async (cityName) => {
    const API_KEY = 'bee597e2f4c0c24c218f0a97162fc5a7'; 
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}&lang=az`
      );
      return response

//       const dailyForecast = forecastResponse.data.list.filter(reading =>
//         reading.dt_txt.includes("12:00:00")
//       );
//       setForecastData(dailyForecast);

//       const temperatures = dailyForecast.map(data => data.main.temp);
//       const humidities = dailyForecast.map(data => data.main.humidity);
//       const weatherDescriptions = dailyForecast.map(data => data.weather[0].description);
//       const dates = dailyForecast.map(data =>
//         new Date(data.dt_txt).toLocaleDateString()
//       );

//       setTemperatureChartData({
//         series: [{ name: 'Temperature (°C)', data: temperatures }],
//         options: {
//           ...temperatureChartData.options,
//           xaxis: { categories: dates },
//         },
//       });

//       setHumidityChartData({
//         series: [{ name: 'Humidity (%)', data: humidities }],
//         options: {
//           ...humidityChartData.options,
//           xaxis: { categories: dates },
//         },
//       });

//       setWeatherDescriptionChartData({
//         series: [{ name: 'Weather Description', data: weatherDescriptions.map(desc => {
//           if (desc.includes("rain")) return 10;
//           if (desc.includes("clear")) return 20;
//           if (desc.includes("cloud")) return 15;
//           return 5; // Default dəyər
//         }) }],
//         options: {
//           ...weatherDescriptionChartData.options,
//           xaxis: { categories: dates },
//         },
//       });
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

