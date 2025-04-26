'use client';

import { useWeatherStore } from '@/zustand/store/store';
import SelectedWeather from '@/components/ui/search-weather/selected-weather/selected-weather';
import styles from './page.module.scss';
import { v4 as uuidv4 } from 'uuid';

const FavoritesPage = () => {
  const favorites = useWeatherStore((state) => state.favorites);

  return (
    <div className={styles.container}>
      {favorites.length ? (
        favorites.map((city) => (
          <SelectedWeather key={uuidv4()} city={city} />
        ))
      ) : (
        <p>Нет избранных городов.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
