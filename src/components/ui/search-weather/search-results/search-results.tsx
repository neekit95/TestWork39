'use client';

import { useWeatherStore } from '@/zustand/store/store';
import { v4 as uuidv4 } from 'uuid';
import { useRef } from 'react';
import styles from './search-results.module.scss';
import { GeoCity } from '@/lib/services/weather-api';

interface SearchResultsProps {
  clearCities?: () => void;
  inputValue: string;
  isDebouncing: boolean;
  onCitySelect: (city: GeoCity) => void;
}

const SearchResults = ({
  inputValue,
  isDebouncing,
  onCitySelect,
}: SearchResultsProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const cities = useWeatherStore((s) => s.cities);
  const isLoading = useWeatherStore((s) => s.isLoading);
  const error = useWeatherStore((s) => s.error);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  if (!cities.length && inputValue.trim() && !isDebouncing)
    return <p>Ничего не найдено</p>;

  if (!cities.length) return null;

  return (
    <div className={styles.container} ref={ref}>
      <p className={styles.paragraph}>Результаты поиска:</p>
      <div className={styles.results}>
        {cities.map((city: GeoCity) => (
          <button
            key={uuidv4()}
            onClick={() => onCitySelect(city)}
            className={styles.cityButton}
          >
            {city.name},{city.state ? `${city.state}, ` : ''}
            {city.country}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
