import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chart from "react-apexcharts";


const WeatherPage = () => {
  const { city } = useParams();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  // Dinamik qrafik seçimi üçün state
  const [selectedChart, setSelectedChart] = useState("temperature");

  const [temperatureChartData, setTemperatureChartData] = useState({
   
    options: {

      chart: {
        height: 950,
        type: "area",
        animations: {
          enabled: false,
          easing: "easeinout",
          speed: 800,
        },
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
        },
        zoom: {
          enabled: false,
        },
      },
      noData: {
        text: "loading",
      },
      tooltip: {
        marker: {
          show: false,
        },
        fixed: {
          enabled: false,
          // position: "bottomLeft",
          // offsetX: 20,
          // offsetY: -20,
        },
      },

      grid: {
        show: false,
      },

      plotOptions: {
        area: {
          fillTo: "end",
        },
      },

      yaxis: {
        show: true,
        labels: {
          show: false,
        },
      },

      stroke: {
        width: 2,
        colors: [], // CHANGE
      },
      series: [
        {
          series: [{ name: "Temperature (°C)",}], //CHANGE
          data: [setTemperatureChartData], //CHANGE; derece ile yaz
        },
      ],

      xaxis: {
        categories: [],
        axisBorder: {
          height: 0,
        },
        axisTicks: {
          height: 0,
        },
        labels: {
          style: {
            colors: [],
          },
        },
      },

      markers: {
        colors: ["#fff"],
        shape: "circle",
        radius: 1,
      },

      dataLabels: {
        enabled: true,
        offsetY: -10,
        style: {
          fontSize: "10px",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 200,
          colors: ["transparent"],
        },
        background: {
          borderWidth: 0,
        },
      },

      title: {
        margin: 0,
        offsetX: 10,
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },

      fill: {
        colors: [], // CHANGE
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          stops: [0, 100],
        },

      },
    },
  });

  const [humidityChartData, setHumidityChartData] = useState({
   
    options: {
      chart: {
        height: 950,
        type: "area",
        animations: {
          enabled: false,
          easing: "easeinout",
          speed: 800,
        },
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
        },
        zoom: {
          enabled: false,
        },
      },
      noData: {
        text: "loading",
      },
      tooltip: {
        marker: {
          show: false,
        },
        fixed: {
          enabled: false,
          // position: "bottomLeft",
          // offsetX: 20,
          // offsetY: -20,
        },
      },

      grid: {
        show: false,
      },

      plotOptions: {
        area: {
          fillTo: "end",
        },
      },

      yaxis: {
        show: true,
        labels: {
          show: false,
        },
      },

      stroke: {
        width: 2,
        colors: [], // CHANGE
      },
      series: [
        {
          name: ["Humidity (%)", ], //CHANGE
          data: [setHumidityChartData], //CHANGE; derece ile yaz
        },
      ],

      xaxis: {
        categories: [],
        axisBorder: {
          height: 0,
        },
        axisTicks: {
          height: 0,
        },
        labels: {
          style: {
            colors: [],
          },
        },
      },

      markers: {
        colors: ["#fff"],
        shape: "circle",
        radius: 1,
      },

      dataLabels: {
        enabled: true,
        offsetY: -10,
        style: {
          fontSize: "10px",
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 200,
          colors: ["transparent"],
        },
        background: {
          borderWidth: 0,
        },
      },

      title: {
        margin: 0,
        offsetX: 10,
        style: {
          fontSize: "16px",
          fontWeight: "bold",
        },
      },

      fill: {
        colors: [], // CHANGE
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
    },
  });

  const [weatherDescriptionChartData, setWeatherDescriptionChartData] =
    useState({
      
      options: {
        chart: {
          height: 950,
          type: "area",
          animations: {
            enabled: false,
            easing: "easeinout",
            speed: 800,
          },
          toolbar: {
            show: false,
          },
          dropShadow: {
            enabled: true,
          },
          zoom: {
            enabled: false,
          },
        },
        noData: {
          text: "loading",
        },
        tooltip: {
          marker: {
            show: false,
          },
          fixed: {
            enabled: false,
            // position: "bottomLeft",
            // offsetX: 20,
            // offsetY: -20,
          },
        },

        grid: {
          show: false,
        },

        plotOptions: {
          area: {
            fillTo: "end",
          },
        },

        yaxis: {
          show: true,
          labels: {
            show: false,
          },
        },

        stroke: {
          width: 2,
          colors: [], // CHANGE
        },
        series: [
          {
            name: "Weather Description",
            data: setWeatherDescriptionChartData,//CHANGE
           
          },
        ],

        xaxis: {
          categories: [],
          axisBorder: {
            height: 0,
          },
          axisTicks: {
            height: 0,
          },
          labels: {
            style: {
              colors: [],
            },
          },
        },

        markers: {
          colors: ["#fff"],
          shape: "circle",
          radius: 1,
        },

        dataLabels: {
          enabled: true,
          offsetY: -10,
          style: {
            fontSize: "10px",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 200,
            colors: ["transparent"],
          },
          background: {
            borderWidth: 0,
          },
        },

        title: {
          margin: 0,
          offsetX: 10,
          style: {
            fontSize: "16px",
            fontWeight: "bold",
          },
        },

        fill: {
          colors: [], // CHANGE
          type: "gradient",
          gradient: {
            shade: "light",
            type: "vertical",
            shadeIntensity: 0.5,
            opacityFrom: 0.5,
            opacityTo: 0.1,
            stops: [0, 100],
          },
        },
      },
    });

  const API_KEY = "bee597e2f4c0c24c218f0a97162fc5a7"; // OpenWeather API açarınızı daxil edin

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const currentResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        setCurrentWeather(currentResponse.data);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );

        const dailyForecast = forecastResponse.data.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        );
        setForecastData(dailyForecast);

        const temperatures = dailyForecast.map((data) => data.main.temp);
        const humidities = dailyForecast.map((data) => data.main.humidity);
        const weatherDescriptions = dailyForecast.map(
          (data) => data.weather[0].description
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

        setWeatherDescriptionChartData({
          series: [
            {
              name: "Weather Description",
              data: weatherDescriptions.map((desc) => {
                if (desc.includes("rain")) return 10;
                if (desc.includes("clear")) return 20;
                if (desc.includes("cloud")) return 15;
                return 5; // Default dəyər
              }),
            },
          ],
          options: {
            ...weatherDescriptionChartData.options,
            xaxis: { categories: dates },
          },
        });
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    fetchWeatherData();
  }, [city]);

  // Seçilmiş qrafik növünə görə render
  const renderChart = () => {
    switch (selectedChart) {
      case "humidity":
        return (
          <Chart
            options={humidityChartData.options}
            series={humidityChartData.series}
            type="area"
            height={450}
          />
        );
      case "weather":
        return (
          <Chart
            options={weatherDescriptionChartData.options}
            series={weatherDescriptionChartData.series}
            type="area"
            height={450}
          />
        );
      case "temperature":
      default:
        return (
          <Chart
            options={temperatureChartData.options}
            series={temperatureChartData.series}
            type="area"
            height={650}
          />
        );
    }
  };

  return (
    <div>
      <h1>{city} Üzrə Hava Məlumatları</h1>
      {currentWeather && (
        <div>
          <h3>Hazırki Temperatur: {currentWeather.main.temp}°C</h3>
          <p>Hava: {currentWeather.weather[0].description}</p>
          <p>Rütubət: {currentWeather.main.humidity}%</p>
          <p>Küləyin Sürəti: {currentWeather.wind.speed} m/s</p>
        </div>
      )}

      <div className="chart-controls">
        <button onClick={() => setSelectedChart("temperature")}>Temperatur</button>
        <button onClick={() => setSelectedChart("humidity")}>Rütubət</button>
        <button onClick={() => setSelectedChart("weather")}>Hava Vəziyyəti</button>
      </div>

      <div className="chart">{renderChart()}</div>

      <div className="forecast">
        {forecastData.map((day, index) => (
          <div key={index} className="forecast-day">
            <h4>{new Date(day.dt_txt).toLocaleDateString()}</h4>
            <p>Temperature: {day.main.temp}°C</p>
            <p>Weather: {day.weather[0].description}</p>
            <p>Humidity: {day.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherPage;
