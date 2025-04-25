import { StateCreator } from 'zustand';
import {
  fetchCitiesByName,
  GeoCity,
} from '@/lib/services/weather-api';

export interface WeatherSlice {
  cities: GeoCity[];
  selectedCity: GeoCity | null;
  isLoading: boolean;
  error: string | null;
  searchCities: (name: string) => Promise<void>;
  selectCity: (city: GeoCity) => void;
}

export const createWeatherSlice: StateCreator<WeatherSlice> = (
  set
) => ({
  cities: [],
  selectedCity: null,
  isLoading: false,
  error: null,

  searchCities: async (name) => {
    set({ isLoading: true, error: null });
    try {
      const results = await fetchCitiesByName(name);
      set({ cities: results, isLoading: false });
    } catch (error) {
      set({ error: 'Ошибка при поиске', isLoading: false });
    }
  },

  selectCity: (city) => {
    set({ selectedCity: city });
  },
  clearSelectedCity: () => set({ selectedCity: null }),
});
