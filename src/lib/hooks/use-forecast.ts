'use client';

import { useEffect, useState } from 'react';
import {
  fetchWeeklyForecast,
  fetchWeeklyForecastByCityName,
  ForecastResponse,
} from '@/lib/services/weather-api';
import { useSearchParams } from 'next/navigation';

export const useForecast = () => {
  const searchParams = useSearchParams();
  const [lat, setLat] = useState<string | null>(
    searchParams.get('lat')
  );
  const [lon, setLon] = useState<string | null>(
    searchParams.get('lon')
  );

  const [city, setCity] = useState<string | null>(
    searchParams.get('city')
  );

  const [forecast, setForecast] = useState<ForecastResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [firstLoadComplete, setFirstLoadComplete] = useState(false);

  // useEffect(() => {
  //   const savedCity = localStorage.getItem('selectedCity');
  //   if (savedCity) {
  //     const { lat, lon } = JSON.parse(savedCity);
  //     setLat(lat);
  //     setLon(lon);
  //   }
  // }, []);

  useEffect(() => {
    const loadForecast = async () => {
      if (city) {
        setLoading(true);
        try {
          const data = await fetchWeeklyForecastByCityName(city);
          setForecast(data);
          // localStorage.setItem(
          //   'selectedCity',
          //   JSON.stringify({ lat, lon })
          // );
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
  }, [lat, lon]);

  // const resetCity = () => {
  //   localStorage.removeItem('selectedCity');
  // };

  return {
    forecast,
    loading,
    error,
    firstLoadComplete,
    // resetCity,
  };
};
