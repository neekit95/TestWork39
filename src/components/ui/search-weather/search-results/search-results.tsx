'use client';

import style from './search-results.module.scss';
import { useWeatherStore } from '@/zustand/store/store';

const SearchResults = () => {
  const weather = useWeatherStore((s) => s.currentWeather);
  const isLoading = useWeatherStore((s) => s.isLoading);
  const error = useWeatherStore((s) => s.error);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!weather) return null;

  return (
    <div className={style.container}>
      <h2>{weather.name}</h2>
      <p>Температура: {weather.main.temp}°C</p>
      <p>Ощущается как: {weather.main.feels_like}°C</p>
      <p>{weather.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="icon"
      />
    </div>
  );
};

export default SearchResults;
