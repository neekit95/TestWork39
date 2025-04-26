'use client';

import style from './selected-weather.module.scss';
import { useWeatherStore } from '@/zustand/store/store';
import { GeoCity } from '@/lib/services/weather-api';

interface SelectedWeatherProps {
  city: GeoCity;
}

const SelectedWeather = ({ city }: SelectedWeatherProps) => {
  const favoritesWeather = useWeatherStore((s) => s.favoritesWeather);
  const favorites = useWeatherStore((s) => s.favorites);
  const selectedCity = useWeatherStore((s) => s.selectedCity);
  const addToFavorites = useWeatherStore((s) => s.addToFavorites);
  const removeFromFavorites = useWeatherStore(
    (s) => s.removeFromFavorites
  );

  const weather =
    city === selectedCity
      ? favoritesWeather[`${city.name}-${city.lat}-${city.lon}`]
      : favoritesWeather[`${city.name}-${city.lat}-${city.lon}`];

  const isFavorite = favorites.some((fav) => fav.name === city.name);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(city);
    } else {
      addToFavorites(city);
    }
  };

  if (!weather) {
    return <p>Загрузка погоды для {city.name}...</p>;
  }

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
