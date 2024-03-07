import React, { useReducer, useEffect } from 'react';

const initialState = {
  loading: true,
  error: '',
  weatherData: null,
};

const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_ERROR';

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        weatherData: action.payload,
        error: '',
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const LoadingIndicator = () => <p>Loading...</p>;

const ErrorDisplay = ({ error }) => <p>{error}</p>;

const WeatherDetails = ({ weatherData }) => (
  <div className="weather-card">
    <h2 className="weather-card__title">Weather Information</h2>
    <div className="weather-card__content">
      <p className="weather-card__item">Temperature: {weatherData.main.temp}</p>
      <p className="weather-card__item">Max Temperature: {weatherData.main.temp_max}</p>
      <p className="weather-card__item">Min Temperature: {weatherData.main.temp_min}</p>
      <p className="weather-card__item">Location: {weatherData.name}</p>
      <p className="weather-card__item">Weather: {weatherData.weather[0].main}</p>
      <p className="weather-card__item">Description: {weatherData.weather[0].description}</p>
    </div>
  </div>
);

const Weather = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const weatherApi = {
    key: '356a2a96918e23662c88d6424c7f8fbe',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`${weatherApi.baseUrl}?lat=44.34&lon=10.99&appid=${weatherApi.key}&units=metric`);
        const data = await response.json();
        dispatch({ type: FETCH_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: FETCH_ERROR, payload: 'Failed to fetch weather data' });
      }
    };

    fetchWeatherData();
  }, []);


  if (state.loading) {
    return <LoadingIndicator />;
  }

  if (state.error) {
    return <ErrorDisplay error={state.error} />;
  }

  return <WeatherDetails weatherData={state.weatherData} />;
};

export default Weather;
