import React, { useState } from 'react';
import { Radio } from 'react-loader-spinner'; 


import './App.css'
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  console.log(weatherData)
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWeatherData, setShowWeatherData] = useState(false);
  
  


  
  
  
  const fetchWeatherData = async () => {
    try {
      if (!location) {
        setError('Please enter a location.');
        return;
      }

      setError('');
      setLoading(true);

      const apiKey = 'b0e4d847b6ad518d6675ab218a6bb97e';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setShowWeatherData(true);

        setTimeout(()=>{
          setShowWeatherData(false);
          setWeatherData(null);
          setLocation('')
        }, 5000)
        
      } else {
        console.error('API Error:', response.status, await response.text());
        setError('Location not found. Please enter a valid location.');
      }

      // Delay setting loading to false to show loading spinner for 4 seconds
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('An error occurred while fetching weather data.');
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className='weatherreport'>
      <h1 className='header'>Live Weather Report</h1>
      <label className="label" for="myInput">Location</label>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)} 
        className='input-group'
        id="myInput"
      />
  <div>
      <button className="button" onClick={fetchWeatherData}>
        <div className="button__line"></div>
        <div className="button__line"></div>
        <span className="button__text">Report</span>
        <div className="button__drow1"></div>
        <div className="button__drow2"></div>
  </button>
        
      </div>
      {error && <p className="error">{error}</p>}

      {loading ? (
        <div><Radio
        visible={true}
        height="80"
        width="80"
        ariaLabel="radio-loading"
        wrapperStyle={{}}
        colors={['#51E5FF', '#7DE2D1', '#FF7E6B']}
        wrapperClass="radio-wrapper"
      /><div><p className='loading'>Loading..!</p></div></div>
      ) : (
        showWeatherData && (
          <div className='weather-box'>
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p><b>Temperature</b>: {weatherData.main.temp}°C</p>
            <p><b>Weather</b>: {weatherData.weather[0].description}, {weatherData.weather[0].main}</p>
            <p><b>Humidity</b>: {weatherData.main.humidity}%</p>
            <p><b>Wind Speed</b>: {weatherData.wind.speed} m/s</p>
          </div>
        )
      )}
      </div>
    </div>
  );
};

export default App;
