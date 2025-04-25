import { create } from 'zustand';
import {
  createWeatherSlice,
  WeatherSlice,
} from '../slices/weather-slice';

export const useWeatherStore = create<WeatherSlice>()((...a) => ({
  ...createWeatherSlice(...a),
}));
