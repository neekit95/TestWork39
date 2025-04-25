'use client';

import { useEffect, useRef, useState } from 'react';
import { useWeatherStore } from '@/zustand/store/store';
import style from './search-weather.module.scss';
import Input from '@/components/ui/input/input';
import SearchResults from '@/components/ui/search-weather/search-results/search-results';
import { useClickOutside } from '@/lib/hooks/use-click-outside';

const SearchWeather = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const setCities = useWeatherStore.setState;
  const [inputValue, setInputValue] = useState('');
  const [readyToSearch, setReadyToSearch] = useState(false);

  const clearCities = () => {
    setCities({ cities: [] });
  };

  const clearInput = () => {
    setInputValue('');
  };

  useEffect(() => {
    if (inputValue) {
      setTimeout(() => {
        setReadyToSearch(true);
      }, 500);
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
        <SearchResults clearCities={clearCities} />
      )}
    </div>
  );
};

export default SearchWeather;
