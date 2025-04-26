'use client';

import style from './selected-weather.module.scss';
import { useEffect, useState } from 'react';
import { useWeatherStore } from '@/zustand/store/store';
import {
  fetchCurrentWeather,
  CurrentWeather,
} from '@/lib/services/weather-api';
import { GeoCity } from '@/lib/services/weather-api';

interface SelectedWeatherProps {
  city?: GeoCity; // передаем либо пропс city, либо берем из стора
}

const SelectedWeather = ({
  city: cityProp,
}: SelectedWeatherProps) => {
  const selectedCity = useWeatherStore((s) => s.selectedCity);
  const favorites = useWeatherStore((s) => s.favorites);
  const addToFavorites = useWeatherStore((s) => s.addToFavorites);
  const removeFromFavorites = useWeatherStore(
    (s) => s.removeFromFavorites
  );

  const city = cityProp || selectedCity; // используем либо переданный пропс, либо из стора
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFavorite = city
    ? favorites.some((fav) => fav.name === city.name)
    : false;

  const toggleFavorite = () => {
    if (!city) return;
    if (isFavorite) {
      removeFromFavorites(city);
    } else {
      addToFavorites(city);
    }
  };

  useEffect(() => {
    if (!city) return;

    const getWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCurrentWeather(city.lat, city.lon);
        setWeather(data);
      } catch {
        setError('Не удалось загрузить погоду');
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, [city]);

  if (!city) return null;
  if (loading) return <p>Загрузка погоды...</p>;
  if (error) return <p>{error}</p>;
  if (!weather) return null;

  return (
    <div className={style.container}>
      <div className={style.left}>
        <h3 className={style.h3}>
          {city.name}
          {city.state ? `, ${city.state}` : ''}, {city.country}
        </h3>
        <p>
          🌡 Температура: {weather.main.temp}°C (ощущается как{' '}
          {weather.main.feels_like}°C)
        </p>
        <p>☁️ {weather.weather[0].description}</p>
      </div>

      <div className={style.right}>
        <img
          className={style.image}
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Погода"
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
