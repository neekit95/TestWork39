'use client';

import { useEffect, useState } from 'react';
import {
  fetchWeeklyForecast,
  ForecastResponse,
} from '@/lib/services/weather-api';
import styles from './page.module.scss';
import { useSearchParams } from 'next/navigation';

const ForecastPage = () => {
  const searchParams = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  const [forecast, setForecast] = useState<ForecastResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat && lon) {
      const loadForecast = async () => {
        setLoading(true);
        try {
          const data = await fetchWeeklyForecast(lat, lon);
          setForecast(data);
        } catch (err) {
          setError('Ошибка при загрузке прогноза');
          console.error('Ошибка загрузки прогноза:', err);
        } finally {
          setLoading(false);
        }
      };
      loadForecast();
    }
  }, [lat, lon]);

  if (loading) return <div>Загрузка прогноза...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      {forecast ? (
        <div>
          <h1>Прогноз на неделю</h1>
          {forecast.list.map((day) => (
            <div key={day.dt} className={styles.day}>
              <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
              <p>
                🌡 {day.main.temp}°C (Мин: {day.main.temp_min}°C /
                Макс: {day.main.temp_max}°C)
              </p>
              <p>☁️ {day.weather[0].description}</p>
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt="Погода"
              />
            </div>
          ))}
        </div>
      ) : (
        <div>Нет данных для прогноза.</div>
      )}
    </div>
  );
};

export default ForecastPage;
