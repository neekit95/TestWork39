'use client';

import { useEffect } from 'react';
import { useWeatherStore } from '@/zustand/store/store';

export const useLoadFavorites = () => {
  const loadFavorites = useWeatherStore(
    (state) => state.loadFavorites
  );
  const loadFavoritesWeather = useWeatherStore(
    (state) => state.loadFavoritesWeather
  );

  useEffect(() => {
    loadFavorites();
    loadFavoritesWeather();
  }, [loadFavorites, loadFavoritesWeather]);
};
