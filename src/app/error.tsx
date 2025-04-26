'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error('Произошла ошибка:', error);
  }, [error]);

  return (
    <div className="loading">
      <h2>Упс! Что-то пошло не так!</h2>
      <p>{error.message}</p>
      <button onClick={() => router.push('/')}>
        Вернуться на главную
      </button>
    </div>
  );
}
