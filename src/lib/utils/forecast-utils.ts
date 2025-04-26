import { ForecastResponse } from '@/lib/services/weather-api';

export const groupByDayOfWeek = (list: ForecastResponse['list']) => {
  const grouped: Record<string, ForecastResponse['list']> = {};
  list.forEach((item) => {
    const day = new Date(item.dt * 1000).toLocaleDateString('ru-RU', {
      weekday: 'long',
    });
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(item);
  });
  return grouped;
};

export const formatTime = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};
