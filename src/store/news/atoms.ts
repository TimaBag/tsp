import { atom } from 'recoil';

import { News } from './models';

const initialNewsList: News[] = [];
export const NewsListAtom = atom({
  key: 'NewsListAtom',
  default: initialNewsList,
});
