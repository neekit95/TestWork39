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
  loadFavorites: () => void;
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
        const newFavorites = [...state.favorites, city];
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'favorites',
            JSON.stringify(newFavorites)
          );
        }
        return { favorites: newFavorites };
      }
      return state;
    });
  },

  removeFromFavorites: (city) => {
    set((state) => {
      const newFavorites = state.favorites.filter(
        (fav) => fav.name !== city.name
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'favorites',
          JSON.stringify(newFavorites)
        );
      }
      return { favorites: newFavorites };
    });
  },

  loadFavorites: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('favorites');
      if (stored) {
        try {
          const favorites = JSON.parse(stored);
          set({ favorites });
        } catch {
          set({ favorites: [] });
        }
      }
    }
  },
});
