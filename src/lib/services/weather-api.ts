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
