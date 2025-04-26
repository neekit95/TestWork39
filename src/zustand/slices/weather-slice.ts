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
  favorites: GeoCity[];
  favoritesWeather: Record<string, CurrentWeather>;
  favoritesLoading: boolean;
  isLoading: boolean;
  error: string | null;
  searchCities: (name: string) => Promise<void>;
  selectCity: (city: GeoCity) => void;
  addToFavorites: (city: GeoCity) => void;
  removeFromFavorites: (city: GeoCity) => void;
  loadFavorites: () => void;
  loadFavoritesWeather: () => Promise<void>;
  loadWeatherForCity: (city: GeoCity) => Promise<void>;
}

export const createWeatherSlice: StateCreator<WeatherSlice> = (
  set,
  get
) => ({
  cities: [],
  selectedCity: null,
  favorites: [],
  favoritesWeather: {},
  favoritesLoading: false,
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

    const existingWeather =
      get().favoritesWeather[`${city.name}-${city.lat}-${city.lon}`];
    if (!existingWeather) {
      get().loadWeatherForCity(city);
    }
  },

  loadWeatherForCity: async (city: GeoCity) => {
    try {
      const weather = await fetchCurrentWeather(city.lat, city.lon);
      set((state) => ({
        favoritesWeather: {
          ...state.favoritesWeather,
          [`${city.name}-${city.lat}-${city.lon}`]: weather,
        },
      }));
    } catch (error) {
      console.error(
        `Ошибка при загрузке погоды для города ${city.name}:`,
        error
      );
    }
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
