'use client';

import { useWeatherStore } from '@/zustand/store/store';
import SelectedWeather from '@/components/ui/search-weather/selected-weather/selected-weather';
import styles from './page.module.scss';
import { useEffect } from 'react';

const FavoritesPage = () => {
  const favorites = useWeatherStore((state) => state.favorites);
  const loadFavorites = useWeatherStore(
    (state) => state.loadFavorites
  );

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <div className={styles.container}>
      {favorites.length ? (
        favorites.map((city) => (
          <SelectedWeather
            key={`${city.name}-${city.lat}-${city.lon}`}
            city={city}
          />
        ))
      ) : (
        <p>Нет избранных городов.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
