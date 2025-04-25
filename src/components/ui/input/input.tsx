'use client';

import style from './input.module.scss';
import React, { useEffect } from 'react';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { useWeatherStore } from '@/zustand/store/store';

interface InputProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ inputValue, setInputValue }: InputProps) => {
  const debouncedValue = useDebounce(inputValue, 500);
  const searchCities = useWeatherStore((s) => s.searchCities);
  const setCities = useWeatherStore.setState;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (debouncedValue.trim()) {
      searchCities(debouncedValue.trim());
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (!inputValue) {
      setCities({ cities: [] });
    }
  }, [inputValue]);

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
