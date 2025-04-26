import { StateCreator } from 'zustand';
import {
  fetchWeeklyForecast,
  ForecastResponse,
  GeoCity,
} from '@/lib/services/weather-api';

export interface ForecastSlice {
  weeklyForecast: ForecastResponse | null;
  forecastLoading: boolean;
  forecastError: string | null;
  loadWeeklyForecast: (lat: string, lon: string) => Promise<void>;
}

export const createForecastSlice: StateCreator<ForecastSlice> = (
  set
) => ({
  weeklyForecast: null,
  forecastLoading: false,
  forecastError: null,

  loadWeeklyForecast: async (lat, lon) => {
    set({ forecastLoading: true, forecastError: null });

    try {
      const forecastData = await fetchWeeklyForecast(lat, lon);
      set({ weeklyForecast: forecastData, forecastLoading: false });
    } catch (error) {
      set({
        forecastError: 'Ошибка загрузки прогноза',
        forecastLoading: false,
      });
      console.error('Ошибка загрузки прогноза:', error);
    }
  },
});
