'use client';

import { useForecast } from '@/lib/hooks/use-forecast';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  groupByDayOfWeek,
  formatTime,
} from '@/lib/utils/forecast-utils';

const ForecastPage = () => {
  const router = useRouter();
  const { forecast, loading, error, firstLoadComplete, resetCity } =
    useForecast();

  const handleSelectCity = () => {
    resetCity();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="loading">
        <div>Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading">
        <div>{error}</div>
      </div>
    );
  }

  if (!forecast && firstLoadComplete) {
    return (
      <div className="loading">
        <div className={styles.choose}>
          <p>Необходимо выбрать город для прогноза</p>
          <button onClick={handleSelectCity}>Выбрать город</button>
        </div>
      </div>
    );
  }

  if (!forecast) return null;

  return (
    <div className={styles.container}>
      <div>
        <h1>{forecast.city.name}</h1>
        {Object.entries(groupByDayOfWeek(forecast.list)).map(
          ([dayName, entries]) => (
            <div key={dayName} className={styles.day}>
              <h2>
                {dayName.charAt(0).toUpperCase() + dayName.slice(1)}
              </h2>
              {entries.map((entry) => (
                <div key={entry.dt} className={styles.hourly}>
                  <p>{formatTime(entry.dt)}</p>
                  <p>
                    🌡 {entry.main.temp}°C (Мин: {entry.main.temp_min}
                    °C / Макс: {entry.main.temp_max}°C)
                  </p>
                  <p>{entry.weather[0].description}</p>
                  <Image
                    src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
                    alt="Погода"
                    width={100}
                    height={100}
                  />
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ForecastPage;
