import { create } from 'zustand';
import {
  createWeatherSlice,
  WeatherSlice,
} from '../slices/weather-slice';
import {
  createFavoritesSlice,
  FavoritesSlice,
} from '../slices/favorites-slice';

type StoreState = WeatherSlice & FavoritesSlice;

export const useWeatherStore = create<StoreState>()((...a) => ({
  ...createWeatherSlice(...a),
  ...createFavoritesSlice(...a),
}));
