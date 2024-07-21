import React, { useState, ChangeEvent } from 'react';//Hooks de react
import { getCurrentWeather } from './../services/weatherServices';//Llamado de la api
import { WeatherData } from '../types/weatherTypes';//Llamado de la estructura
import '../App.css';//Css

// import { bermuda } from './../../images/icons/bermudas.jpg';

const cities: string[] = [
    'Londres', 'Paris', 'Nueva York', 'Tokio', 'Sidney',
    'Los Ángeles', 'Barcelona', 'Berlin', 'Toronto', 'Buenos Aires'
];

const Weather: React.FC = () => {//Bodyd e la estructura
    const [city, setCity] = useState<string>('');
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async () => {
        try {
            // console.log(city);
            const data: WeatherData = await getCurrentWeather(city);
            // console.log('Weather Data:', data);
            setWeather(data);
            setError(null);
        } catch (error) {
            setError('Esta ciudad no existe, por favor intente de nuevo');
            // console.log(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const getBackgroundClass = (): string => {
        if (weather) {
            const description = weather.weather[0].main.toLowerCase();
            if (description.includes('clear')) {
                return 'clear';
            } else if (description.includes('clouds')) {
                return 'cloudy';
            } else if (description.includes('rain')) {
                return 'rainy';
            } else if (description.includes('snow')) {
                return 'snowy';
            } else if (description.includes('storm')) {
                return 'stormy';
            } else {
                return 'default';
            }
        }
        return 'default';
    };

    const getClothingIcon = (): string => {
        if (weather) {
            const description = weather.weather[0].main.toLowerCase();
            if (description.includes('clear')) {
                return './../../images/icons/bermudas.jpg';
            } else if (description.includes('clouds')) {
                return './../../images/icons/bermudas.jpg';
            } else if (description.includes('rain')) {
                return './../../images/icons/bermudas.jpg';
            } else if (description.includes('snow')) {
                return './../../images/icons/bermudas.jpg';
            } else if (description.includes('storm')) {
                return './../../images/icons/bermudas.jpg';
            } else {
                return './../../images/icons/default.jpg';
            }
        }
        return './../../images/icons/default.jpg';
    };

    return (
        <div className={`weather-background ${getBackgroundClass()}`}>
            <div className="weather-container">
                <div className="search-container">
                    <input
                        type="text"
                        list="cities-list"
                        value={city}
                        onChange={handleChange}
                        placeholder="Ingrese una ciudad"
                    />
                    <datalist id="cities-list">
                        {cities.map(city => (
                            <option key={city} value={city} />
                        ))}
                    </datalist>
                    <button onClick={handleSearch}>Buscar</button>
                </div>

                {error && <p className="error">{error}</p>}
                {weather && (
                    <div className="weather-info">
                        <h2>{weather.name}</h2>
                        <p>Temperatura: {weather.main.temp} °C</p>
                        <p>Presión: {weather.main.pressure} Pa</p>
                        <p>Humedad: {weather.main.humidity} %</p>
                        <p>Descripción: {weather.weather[0].description}</p>
                        <div className="icon-container">
                            <img
                                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                                alt={weather.weather[0].description}
                                className="weather-icon"
                            />
                            <img
                                src={getClothingIcon()}
                                alt="Clothing Icon"
                                className="clothing-icon"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
