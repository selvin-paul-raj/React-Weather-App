import React, { useState } from 'react';
import clear from '../assets/clear.png';
import humidity from '../assets/humidity.png';
import drizzle from '../assets/drizzle.png';
import cloud from '../assets/cloud.png';
import rain from '../assets/rain.png';
import Search from '../assets/search.png';
import snow from '../assets/snow.png';
import wind from '../assets/wind.png';
import Loading from './Loading';

const WeatherApp = () => {
  const [wicon, setWicon] = useState(cloud);
  const [weatherData, setWeatherData] = useState({
    humidity: '',
    windSpeed: '',
    temperature: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);

  const api_key = import.meta.env.VITE_API_KEY;

  const search = async () => {
    const element = document.getElementsByClassName('cityInput');

    if (element[0].value === '') {
      return;
    }

    setLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();
       const { name,wind} = data; 
      const { humidity, temp } = data.main;
      setWeatherData({
        humidity: `${humidity} %`,
        windSpeed: `${Math.floor(wind.speed)} km/h`,
        temperature: `${Math.floor(temp)} .C`,
        location: name,
      });

      setWeatherIcon(data.weather[0].icon);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const setWeatherIcon = (icon) => {
    switch (icon) {
      case '01d':
      case '01n':
        setWicon(clear);
        break;
      case '02d':
      case '02n':
        setWicon(cloud);
        break;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        setWicon(drizzle);
        break;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        setWicon(rain);
        break;
      case '13d':
      case '13n':
        setWicon(snow);
        break;
      default:
        setWicon(cloud);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" required />
        <div className="search-icon" onClick={search}>
          <img src={Search} alt="Search Icon" />
        </div>
      </div>
      {loading ? <Loading/> :<>
      <div className="weather-image">
        <img src={wicon} alt="Cloud Icon" />
      </div>
      <div className="weather-temp">{weatherData.temperature}</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="humidity Icon" className="icon" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="Wind Icon" className="icon" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
      </>}
    </div>
  );
};

export default WeatherApp;
