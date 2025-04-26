import { StateCreator } from 'zustand';
import {
  fetchCitiesByName,
  GeoCity,
} from '@/lib/services/weather-api';

export interface WeatherSlice {
  cities: GeoCity[];
  selectedCity: GeoCity | null;
  favorites: GeoCity[];
  isLoading: boolean;
  error: string | null;
  searchCities: (name: string) => Promise<void>;
  selectCity: (city: GeoCity) => void;
  addToFavorites: (city: GeoCity) => void;
  removeFromFavorites: (city: GeoCity) => void;
}

export const createWeatherSlice: StateCreator<WeatherSlice> = (
  set
) => ({
  cities: [],
  selectedCity: null,
  favorites: [],
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

  addToFavorites: (city) => {
    set((state) => {
      if (!state.favorites.some((fav) => fav.name === city.name)) {
        return { favorites: [...state.favorites, city] };
      }
      return state;
    });
  },

  removeFromFavorites: (city) => {
    set((state) => ({
      favorites: state.favorites.filter(
        (fav) => fav.name !== city.name
      ),
    }));
  },
});
