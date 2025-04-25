import style from './search-weather.module.scss';
import Input from '@/components/ui/input/input';
import SearchResults from '@/components/ui/search-weather/search-results/search-results';

const SearchWeather = () => {
  return (
    <div className={style.container}>
      <Input />
      <SearchResults />
    </div>
  );
};

export default SearchWeather;
