import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export interface GeoCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}

export const fetchCitiesByName = async (
  name: string
): Promise<GeoCity[]> => {
  const response = await axios.get<GeoCity[]>(
    'https://api.openweathermap.org/geo/1.0/direct',
    {
      params: {
        q: name,
        limit: 5,
        appid: API_KEY,
      },
    }
  );

  return response.data;
};

export interface CurrentWeather {
  weather: { description: string; icon: string }[];
  main: { temp: number; feels_like: number };
  name: string;
}

export const fetchCurrentWeather = async (
  lat: number,
  lon: number
): Promise<CurrentWeather> => {
  const response = await axios.get<CurrentWeather>(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'ru',
      },
    }
  );
  return response.data;
};
