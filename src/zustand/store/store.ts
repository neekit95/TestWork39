import { create } from 'zustand';
import {
  createWeatherSlice,
  WeatherSlice,
} from '../slices/weather-slice';
import {
  createFavoritesSlice,
  FavoritesSlice,
} from '../slices/favorites-slice';
import {
  createForecastSlice,
  ForecastSlice,
} from '@/zustand/slices/forecast-slice';

type StoreState = WeatherSlice & FavoritesSlice & ForecastSlice;

export const useWeatherStore = create<StoreState>()((...a) => ({
  ...createWeatherSlice(...a),
  ...createFavoritesSlice(...a),
  ...createForecastSlice(...a),
}));
