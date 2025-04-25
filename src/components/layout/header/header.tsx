'use client';

import Wrapper from '@/components/layout/wrapper/wrapper';
import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Wrapper>
        <nav className={styles.navLinks}>
          <Link href="/" className={styles.link}>
            Главная
          </Link>
          <Link href="/forecast" className={styles.link}>
            Прогноз
          </Link>
          <Link href="/favorites" className={styles.link}>
            Избранное
          </Link>
        </nav>
      </Wrapper>
    </header>
  );
}
