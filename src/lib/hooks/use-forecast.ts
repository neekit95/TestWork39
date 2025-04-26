'use client';

import { useEffect, useState } from 'react';
import {
  fetchWeeklyForecastByCityName,
  ForecastResponse,
} from '@/lib/services/weather-api';
import { useSearchParams } from 'next/navigation';

export const useForecast = () => {
  const searchParams = useSearchParams();
  const city = searchParams.get('city');
  const [forecast, setForecast] = useState<ForecastResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstLoadComplete, setFirstLoadComplete] = useState(false);

  useEffect(() => {
    const loadForecast = async () => {
      if (city) {
        setLoading(true);
        try {
          const data = await fetchWeeklyForecastByCityName(city);
          setForecast(data);
        } catch (err) {
          setError('Ошибка при загрузке прогноза');
          console.error('Ошибка загрузки прогноза:', err);
        } finally {
          setLoading(false);
          setFirstLoadComplete(true);
        }
      } else {
        setFirstLoadComplete(true);
      }
    };

    loadForecast();
  }, [city]);

  return {
    forecast,
    loading,
    error,
    firstLoadComplete,
  };
};
