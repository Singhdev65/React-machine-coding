import React, { useReducer, useEffect, useState } from 'react';
import actionTypes from '../../utils/actionTypes';
import Loading from "../../components/Loading"
import Button from '../../components/Button';

const initialState = {
  loading: true,
  error: '',
  weatherData: null,
};

const weatherReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        weatherData: action.payload,
        error: '',
      };
    case actionTypes.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const LoadingIndicator = () => <Loading />;

const ErrorDisplay = ({ error }) => <p>{error}</p>;

const WeatherDetails = ({ weatherData }) => (
  <div className="weather-card">
    <h2 className="weather-card__title">Weather Information</h2>
    <div className="weather-card__content">
      <p className="weather-card__item">Temperature: {weatherData?.main?.temp}</p>
      <p className="weather-card__item">Max Temperature: {weatherData?.main?.temp_max}</p>
      <p className="weather-card__item">Min Temperature: {weatherData?.main?.temp_min}</p>
      <p className="weather-card__item">Location: {weatherData?.name}</p>
      <p className="weather-card__item">Weather: {weatherData?.weather?.[0]?.main}</p>
      <p className="weather-card__item">Description: {weatherData?.weather?.[0]?.description}</p>
    </div>
  </div>
);

const Weather = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const [value, setValue] = useState("");
  const [location, setLocation] = useState({
    lat: "44.34",
    long: "10.99"
  })

  const handleChange = (e) => setValue(e.target.value)

  const weatherApi = {
    key: '356a2a96918e23662c88d6424c7f8fbe',
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather'
  }

  const getCityWeatherReport = async (city) => {
    try {
      const response = await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
      const data = await response.json();
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_ERROR, payload: 'Failed to fetch weather data' });
    }

  }

  const handleButtonClick = (e) => {
    e.preventDefault();
    getCityWeatherReport(value)
  }

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${weatherApi.baseUrl}?lat=${location.lat}&lon=${location.long}&appid=${weatherApi.key}&units=metric`);
      const data = await response.json();
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: actionTypes.FETCH_ERROR, payload: 'Failed to fetch weather data' });
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({ lat: position.coords.longitude, long: position.coords.latitude })
    })
  }

  useEffect(() => {
    if (navigator.geolocation) getCurrentLocation()
  }, [])

  useEffect(() => {
    let flag = true;

    if (flag) fetchWeatherData();

    return () => { flag = false }
  }, [location]);


  if (state.loading) {
    return <LoadingIndicator />;
  }

  if (state.error) {
    return <ErrorDisplay error={state.error} />;
  }

  return <>
    <form onSubmit={(e) => handleButtonClick(e)} className='form'>
      <input type="text" onChange={handleChange} />
      <Button text={"Search"} />
    </form>
    <WeatherDetails weatherData={state.weatherData} />
  </>;
};

export default Weather;
