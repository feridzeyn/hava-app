import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chart from "react-apexcharts";
import WeatherHeader from "../WeatherHeader";
import CurrentInfo from "../UI/CurrentInfo";
import UpcomingDays from "../UI/UpcomingDays";

const WeatherPage = () => {
  const { cityName } = useParams();
  const [forecastData, setForecastData] = useState([]);
  const [forecastHourly, setForecatHourly] = useState([]);
  const [dayName, setDayName] = useState("");
  const [time, setTime] = useState("");
  const API_KEY = "bee597e2f4c0c24c218f0a97162fc5a7";

  useEffect(function getDayName() {
    const date = new Date();
    const daysOfWeek = [
      "Bazar",
      "Bazar ertəsi",
      "Çərşənbə axşamı",
      "Çərşənbə",
      "Cümə axşamı",
      "Cümə",
      "Cümə ertəsi",
    ];
    const dayIndex = date.getDay();
    setDayName(daysOfWeek[dayIndex]);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    setTime(`${hours}:${minutes}`);
  }, []);

  // Dinamik qrafik seçimi üçün state
  const [selectedChart, setSelectedChart] = useState("temperature");

  const [temperatureChartData, setTemperatureChartData] = useState({
    series: [{ name: "Temperature (°C)", data: [] }],
    options: {
      chart: { height: 350, type: "area" },

      yaxis: { title: { text: "Temperature (°C)" }, min: -10, max: 40 },
    },
  });

  const [humidityChartData, setHumidityChartData] = useState({
    series: [{ name: "Humidity (%)", data: [] }],
    options: {
      chart: { type: "area" },
      xaxis: { categories: [] },
      yaxis: { title: { text: "Humidity (%)" }, show: true },
      plotOptions:{area:{feelTo:'end'}}
    },
  });

  const [windChartData, setWindChartData] = useState({
    series: [{ name: "Wind (km/s)", data: [] }],
    options: {
      chart: { height: 350, type: "area" },
      xaxis: { categories: [] },
      yaxis: { title: { text: "Wind speed" } },
    },
  });
  const [feelChartData, setfeelChartData] = useState({
    series: [{ name: "Feel (km/s)", data: [] }],
    options: {
      chart: { height: 350, type: "area" },
      xaxis: { categories: [] },
      yaxis: { title: { text: "Feel" } },
    },
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}&lang=az`
        );
        // console.log(forecastResponse);
        setForecatHourly(forecastResponse.data.list);

        const dailyForecast = forecastResponse.data.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        );
        setForecastData(dailyForecast);
        console.log(dailyForecast);

        const temperatures = dailyForecast.map((data) => data.main.temp);
        const humidities = dailyForecast.map((data) => data.main.humidity);
        const weatherDescriptions = dailyForecast.map(
          (data) => data.wind.speed
        );
        const dates = dailyForecast.map((data) =>
          new Date(data.dt_txt).toLocaleDateString()
        );

        setTemperatureChartData({
          series: [{ name: "Temperature (°C)", data: temperatures }],
          options: {
            ...temperatureChartData.options,
            xaxis: { categories: dates },
          },
        });

        setHumidityChartData({
          series: [{ name: "Humidity (%)", data: humidities }],
          options: {
            ...humidityChartData.options,
            xaxis: { categories: dates },
          },
        });

        setWindChartData({
          series: [{ name: "Weather Description", data: weatherDescriptions }],
          options: {
            ...windChartData.options,
            xaxis: { categories: dates },
          },
        });
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    fetchWeatherData();
  }, [cityName]);

  // Seçilmiş qrafik növünə görə render
  const renderChart = () => {
    switch (selectedChart) {
      case "humidity":
        return (
          <Chart
            options={humidityChartData.options}
            series={humidityChartData.series}
            type="line"
            height={350}
          />
        );
      case "weather":
        return (
          <Chart
            options={windChartData.options}
            series={windChartData.series}
            type="line"
            height={350}
          />
        );
      case "temperature":
      default:
        return (
          <Chart
            options={temperatureChartData.options}
            series={temperatureChartData.series}
            type="area"
            height={350}
          />
        );
    }
  };

  return (
    <div className="bg-[#283042]">
      <WeatherHeader />
      <div className="container p-5">
        <CurrentInfo
          forecastData={forecastData}
          cityName={cityName}
          dayName={dayName}
          time={time}
        />

        <div className="chart-controls text-white mb-[50px] mt-14">
          <button
            className="mr-3"
            onClick={() => setSelectedChart("temperature")}
          >
            Temperatur
          </button>
          <button className="mr-3" onClick={() => setSelectedChart("humidity")}>
            Rütubət
          </button>
          <button className="mr-3" onClick={() => setSelectedChart("weather")}>
            Külək
          </button>
          <button onClick={() => setSelectedChart("weather")}>
            Hiss edilən
          </button>
        </div>

        <div className="chart">{renderChart()}</div>

        <div className="forecast flex justify-between">
          {forecastData.map((day, index) => (
            <button key={index} className="forecast-day">
              <h3 className="text-white">{dayName}</h3>

              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt="Weather icon"
              />
              <h4>
                {Math.round(day.main.temp_max)}/{Math.round(day.main.temp_min)}
              </h4>

              <UpcomingDays />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
