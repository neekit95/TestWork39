'use client';

import style from './input.module.scss';
import React, { useState, useEffect } from 'react';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { useWeatherStore } from '@/zustand/store/store';

const Input = () => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  const fetchCityWeather = useWeatherStore((s) => s.fetchCityWeather);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (debouncedValue.trim()) {
      fetchCityWeather(debouncedValue.trim());
    }
  }, [debouncedValue]);

  return (
    <div className={style.container}>
      <input
        className={style.input}
        placeholder="Начните поиск"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Input;
