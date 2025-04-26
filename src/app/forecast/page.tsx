'use client';

import React, { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './page.module.scss';

const ForecastPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  useEffect(() => {
    if (!lat || !lon) {
      router.push('/');
    }
  }, [lat, lon, router]);

  if (!lat || !lon) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1>Прогноз на неделю</h1>
      <p>Широта: {lat}</p>
      <p>Долгота: {lon}</p>
    </div>
  );
};

export default ForecastPage;
