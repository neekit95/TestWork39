import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
//
// export interface GeoCity {
//   name: string;
//   country: string;
//   lat: number;
//   lon: number;
//   state?: string;
// }

export interface GeoCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
  local_names?: {
    ru?: string;
  };
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
        lang: 'ru',
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

export interface ForecastResponse {
  city: {
    name: string;
    country: string;
  };
  list: ForecastListItem[];
}

export interface ForecastListItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export const fetchWeeklyForecast = async (
  lat: string,
  lon: string
): Promise<ForecastResponse> => {
  const response = await axios.get<ForecastResponse>(
    'https://api.openweathermap.org/data/2.5/forecast',
    {
      params: {
        lat,
        lon,
        units: 'metric',
        lang: 'ru',
        appid: API_KEY,
      },
    }
  );
  return response.data;
};

export const fetchWeeklyForecastByCityName = async (
  cityName: string
): Promise<ForecastResponse> => {
  const response = await axios.get<ForecastResponse>(
    'https://api.openweathermap.org/data/2.5/forecast',
    {
      params: {
        q: cityName,
        units: 'metric',
        lang: 'ru',
        appid: API_KEY,
      },
    }
  );
  return response.data;
};
