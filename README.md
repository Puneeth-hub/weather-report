import React, { useState } from 'react';
import { Radio } from 'react-loader-spinner';
import Autosuggest from 'react-autosuggest';

import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWeatherData, setShowWeatherData] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async (value) => {
    try {
      if (value.length < 3) {
        return [];
      }

      const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
      const suggestUrl = `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${apiKey}`;

      const response = await fetch(suggestUrl);
      if (response.ok) {
        const data = await response.json();
        return data.list.map((item) => item.name);
      }
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }

    return [];
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Enter location',
    value: location,
    onChange: (e, { newValue }) => setLocation(newValue),
  };

  const fetchWeatherData = async () => {
    // ... Rest of your fetchWeatherData function ...

    // Delay setting loading to false to show loading spinner for 4 seconds
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="App">
      <div className='weatherreport'>
        <h1 className='header'>Live Weather Report</h1>
        <label className="label" htmlFor="myInput">Location</label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => <div>{suggestion}</div>}
          inputProps={inputProps}
        />
        <div>
          <button className="button" onClick={fetchWeatherData}>
            {/* ... Rest of your button code ... */}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
        {loading ? (
          // ... Loading spinner code ...
        ) : (
          showWeatherData && (
            <div className='weather-box'>
              {/* ... Weather data display code ... */}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default App;
