'use client';

import style from './selected-weather.module.scss';
import Image from 'next/image';
import { useWeatherStore } from '@/zustand/store/store';
import { GeoCity } from '@/lib/services/weather-api';
import { useRouter } from 'next/navigation';
import React from 'react';

interface SelectedWeatherProps {
  city: GeoCity;
}

const SelectedWeather = ({ city }: SelectedWeatherProps) => {
  const favoritesWeather = useWeatherStore((s) => s.favoritesWeather);
  const favorites = useWeatherStore((s) => s.favorites);
  const selectedCity = useWeatherStore((s) => s.selectedCity);
  const addToFavorites = useWeatherStore((s) => s.addToFavorites);
  const selectedCityWeather = useWeatherStore(
    (s) => s.selectedCityWeather
  );

  const removeFromFavorites = useWeatherStore(
    (s) => s.removeFromFavorites
  );
  const router = useRouter();

  const weather =
    city === selectedCity
      ? selectedCityWeather
      : favoritesWeather[`${city.name}-${city.lat}-${city.lon}`];
  const isFavorite = favorites.some(
    (fav: GeoCity) => fav.name === city.name
  );

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(city);
    } else {
      addToFavorites(city);
    }
  };

  const handleNavigate = () => {
    router.push(`/forecast?lat=${city.lat}&lon=${city.lon}`);
  };

  if (!weather) {
    return (
      <p>
        Загрузка погоды для {city.name}
        ...
      </p>
    );
  }

  return (
    <div className={style.container} onClick={handleNavigate}>
      <div className={style.left}>
        <h3 className={style.h3}>
          {city.name}
          {city.state ? `, ${city.state}` : ''},{city.country}
        </h3>
        <p>
          🌡 Температура: {weather.main.temp}°C (ощущается как{' '}
          {weather.main.feels_like}
          °C)
        </p>
        <p>{weather.weather[0].description}</p>
      </div>

      <div className={style.right}>
        <Image
          className={style.image}
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Погода"
          width={100}
          height={100}
          unoptimized
        />

        <button
          className={`${style.favoriteButton} ${isFavorite ? style.active : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite
            ? 'Убрать из избранного'
            : 'Добавить в избранное'}
        </button>
      </div>
    </div>
  );
};

export default SelectedWeather;
