import { ReactNode } from 'react';
import style from './wrapper.module.scss';

type Props = {
  children: ReactNode;
};

const Wrapper = ({ children }: Props) => {
  return <div className={style.container}>{children}</div>;
};

export default Wrapper;
