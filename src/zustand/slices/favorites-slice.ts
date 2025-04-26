import { StateCreator } from 'zustand';
import {
  fetchCurrentWeather,
  GeoCity,
  CurrentWeather,
} from '@/lib/services/weather-api';

export interface FavoritesSlice {
  favorites: GeoCity[];
  favoritesWeather: Record<string, CurrentWeather>;
  favoritesLoading: boolean;
  addToFavorites: (city: GeoCity) => void;
  removeFromFavorites: (city: GeoCity) => void;
  loadFavorites: () => void;
  loadFavoritesWeather: () => Promise<void>;
}

export const createFavoritesSlice: StateCreator<FavoritesSlice> = (
  set
) => ({
  favorites: [],
  favoritesWeather: {},
  favoritesLoading: false,

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

  loadFavoritesWeather: async () => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem('favorites');
    if (stored) {
      try {
        const favorites: GeoCity[] = JSON.parse(stored);
        const weatherData: Record<string, CurrentWeather> = {};

        set({ favoritesLoading: true });

        for (const city of favorites) {
          const weather = await fetchCurrentWeather(
            city.lat,
            city.lon
          );
          weatherData[`${city.name}-${city.lat}-${city.lon}`] =
            weather;
        }

        set({
          favoritesWeather: weatherData,
          favoritesLoading: false,
        });
      } catch (error) {
        console.error(
          'Ошибка загрузки погоды избранных городов',
          error
        );
        set({ favoritesWeather: {}, favoritesLoading: false });
      }
    }
  },
});
