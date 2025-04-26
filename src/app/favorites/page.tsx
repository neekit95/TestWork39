'use client';

import { useEffect } from 'react';
import { useWeatherStore } from '@/zustand/store/store';
import SelectedWeather from '@/components/ui/search-weather/selected-weather/selected-weather';
import styles from './page.module.scss';
import { GeoCity } from '@/lib/services/weather-api';

const FavoritesPage = () => {
  const favorites = useWeatherStore((state) => state.favorites);
  const favoritesLoading = useWeatherStore(
    (state) => state.favoritesLoading
  );
  const loadFavorites = useWeatherStore(
    (state) => state.loadFavorites
  );
  const loadFavoritesWeather = useWeatherStore(
    (state) => state.loadFavoritesWeather
  );

  useEffect(() => {
    loadFavorites();
    loadFavoritesWeather();
  }, [loadFavoritesWeather, loadFavorites]);

  if (favoritesLoading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (!favorites.length && !favoritesLoading) {
    return <div className="loading">Нет избранных городов.</div>;
  }

  return (
    <div className={styles.container}>
      {favorites.map((city: GeoCity) => (
        <SelectedWeather
          key={`${city.name}-${city.lat}-${city.lon}`}
          city={city}
        />
      ))}
    </div>
  );
};

export default FavoritesPage;
