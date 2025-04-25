import axios from 'axios';
import type { WeatherData } from '@/zustand/slices/weather-slice';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCity = async (
  city: string
): Promise<WeatherData> => {
  const response = await axios.get<WeatherData>(BASE_URL, {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
      lang: 'ru',
    },
  });

  return response.data;
};
