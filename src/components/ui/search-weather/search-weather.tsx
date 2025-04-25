'use client';

import { useEffect, useRef, useState } from 'react';
import { useWeatherStore } from '@/zustand/store/store';
import style from './search-weather.module.scss';
import Input from '@/components/ui/input/input';
import SearchResults from '@/components/ui/search-weather/search-results/search-results';
import { useClickOutside } from '@/lib/hooks/use-click-outside';
import SelectedWeather from '@/components/ui/search-weather/selected-weather/selected-weather';
import { GeoCity } from '@/lib/services/weather-api';

const SearchWeather = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const setCities = useWeatherStore.setState;
  const [inputValue, setInputValue] = useState('');
  const [readyToSearch, setReadyToSearch] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);
  const selectCity = useWeatherStore((s) => s.selectCity);

  const clearCities = () => {
    setCities({ cities: [] });
  };

  const clearInput = () => {
    setInputValue('');
  };

  const handleCitySelect = (city: GeoCity) => {
    selectCity(city);
    clearCities();
    clearInput();
  };

  useEffect(() => {
    if (inputValue.trim()) {
      setIsDebouncing(true);
      const timeout = setTimeout(() => {
        setReadyToSearch(true);
        setIsDebouncing(false);
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      setReadyToSearch(false);
      setIsDebouncing(false);
    }
  }, [inputValue]);

  useClickOutside(ref, () => {
    clearCities();
    clearInput();
  });

  return (
    <div className={style.container} ref={ref}>
      <Input inputValue={inputValue} setInputValue={setInputValue} />

      {inputValue && readyToSearch && (
        <SearchResults
          clearCities={clearCities}
          inputValue={inputValue}
          isDebouncing={isDebouncing}
          onCitySelect={handleCitySelect}
        />
      )}

      <SelectedWeather />
    </div>
  );
};

export default SearchWeather;
