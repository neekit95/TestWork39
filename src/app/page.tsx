import style from './page.module.scss';
import SearchWeather from '@/components/ui/search-weather/search-weather';

export default function Home() {
  return (
    <div className={style.container}>
      <SearchWeather />
    </div>
  );
}
