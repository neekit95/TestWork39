import { StateCreator } from 'zustand';
import { fetchWeatherByCity } from '@/lib/services/weather-api';

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

export interface WeatherSlice {
  currentWeather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  fetchCityWeather: (city: string) => Promise<void>;
}

export const createWeatherSlice: StateCreator<
  WeatherSlice,
  [],
  [],
  WeatherSlice
> = (set) => ({
  currentWeather: null,
  isLoading: false,
  error: null,

  fetchCityWeather: async (city: string) => {
    try {
      set({ isLoading: true, error: null });
      const data = await fetchWeatherByCity(city);
      set({ currentWeather: data, isLoading: false });
    } catch (error: any) {
      set({ error: 'Ошибка при получении погоды', isLoading: false });
    }
  },
});
