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

  const groupByDayOfWeek = (list: ForecastResponse['list']) => {
    const grouped: Record<string, typeof list> = {};
    list.forEach((item) => {
      const day = new Date(item.dt * 1000).toLocaleDateString(
        'ru-RU',
        { weekday: 'long' }
      );
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(item);
    });
    return grouped;
  };

  return (
    <div className={styles.container}>
      {forecast ? (
        <div>
          <h1>Прогноз на неделю</h1>
          {Object.entries(groupByDayOfWeek(forecast.list)).map(
            ([dayName, entries]) => (
              <div key={dayName} className={styles.day}>
                <h2>
                  {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
                </h2>
                {entries.map((entry) => (
                  <div key={entry.dt} className={styles.hourly}>
                    <p>
                      {new Date(entry.dt * 1000).toLocaleTimeString(
                        'ru-RU',
                        { hour: '2-digit', minute: '2-digit' }
                      )}
                    </p>
                    <p>
                      🌡 {entry.main.temp}°C (Мин:{' '}
                      {entry.main.temp_min}°C / Макс:{' '}
                      {entry.main.temp_max}°C)
                    </p>
                    <p>☁️ {entry.weather[0].description}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
                      alt="Погода"
                    />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      ) : (
        <div>Нет данных для прогноза.</div>
      )}
    </div>
  );
};

export default ForecastPage;
