import axios from 'axios';



export const getWeatherData = async (cityName) => {
    const API_KEY = 'bee597e2f4c0c24c218f0a97162fc5a7'; 
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}&lang=az`
      );
      return response
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

