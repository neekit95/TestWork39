'use client';

import { useWeatherStore } from '@/zustand/store/store';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import styles from './search-results.module.scss';

interface SearchResultsProps {
  clearCities: () => void;
}

const SearchResults = ({ clearCities }: SearchResultsProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const cities = useWeatherStore((s) => s.cities);
  const isLoading = useWeatherStore((s) => s.isLoading);
  const error = useWeatherStore((s) => s.error);
  const selectCity = useWeatherStore((s) => s.selectCity);
  const setCities = useWeatherStore.setState;

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!cities.length) return <p>Ничего не найдено</p>;

  return (
    <div className={styles.results} ref={ref}>
      {cities.map((city) => (
        <button
          key={uuidv4()}
          onClick={() => {
            selectCity(city);
            setCities({ cities: [] });
            clearCities();
          }}
          className={styles.cityButton}
        >
          {city.name}, {city.state ? `${city.state}, ` : ''}
          {city.country}
        </button>
      ))}
    </div>
  );
};

export default SearchResults;
