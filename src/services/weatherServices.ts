// src/services/weatherServices.ts
import axios, { AxiosResponse } from 'axios';//Libreria
import { WeatherData } from '../types/weatherTypes';

const API_KEY = 'bb8d4cc6942bb13d2dab46796f90b700'; //Tokem o clave para usar la api
const BASE_URL = 'https://api.openweathermap.org/data/2.5'; //Api simple

const api = axios.create({
    baseURL: BASE_URL,
    headers: {//Configuracion de la api
        'Content-Type': 'application/json'
    }
});

//Interceptor de la api
api.interceptors.response.use(
    (response: AxiosResponse) => response,//Manda la respuesta si no encuentra algun fallo
    (error) => {
        handleError(error);//Llamado de la fincion
        return Promise.reject(error);//Por si hay error en la promesa
    }
);

const handleError = (error: any) => {
    if (error.response) {
        const status = error.response.status;//Respuesta de la api
        switch (status) {
            case 400:
                console.error("Datos erroneos");
                break;
            case 401:
                console.error("No esta autorizado");
                break;
            case 404:
                console.error("Ciudad no encontrada.");
                break;
            case 500:
                console.error("Problemas con el servidor");
                break;
            default:
                console.error("algo salio mal");
        }
    } else if (error.request) {
        console.error("El servidor no puede dar respuesta");
    } else {
        console.error("Problemas con la config");
    }
};

export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
    try {
        const response: AxiosResponse<WeatherData> = await api.get('/weather', {//LLamado a al api
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'// grados celcius se maneja
            }
        });
        return response.data;
    } catch (error) {
        handleError(error);
        throw error; //data error
    }
};
