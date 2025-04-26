import { StateCreator } from 'zustand';
import {
  fetchCitiesByName,
  fetchCurrentWeather,
  GeoCity,
  CurrentWeather,
} from '@/lib/services/weather-api';

export interface WeatherSlice {
  cities: GeoCity[];
  selectedCity: GeoCity | null;
  selectedCityWeather: CurrentWeather | null;
  isLoading: boolean;
  error: string | null;
  searchCities: (name: string) => Promise<void>;
  selectCity: (city: GeoCity) => void;
  loadWeatherForCity: (city: GeoCity) => Promise<void>;
}

export const createWeatherSlice: StateCreator<WeatherSlice> = (
  set,
  get
) => ({
  cities: [],
  selectedCity: null,
  selectedCityWeather: null,
  isLoading: false,
  error: null,

  searchCities: async (name) => {
    set({ isLoading: true, error: null });
    try {
      const results = await fetchCitiesByName(name);
      set({ cities: results, isLoading: false });
    } catch (error) {
      set({ error: 'Ошибка при поиске', isLoading: false });
      console.error(error);
    }
  },

  selectCity: (city) => {
    set({ selectedCity: city });
    get().loadWeatherForCity(city);
  },

  loadWeatherForCity: async (city) => {
    try {
      const weather = await fetchCurrentWeather(city.lat, city.lon);
      set({ selectedCityWeather: weather });
    } catch (error) {
      console.error(
        `Ошибка при загрузке погоды для города ${city.name}:`,
        error
      );
    }
  },
});
