import { atom } from 'recoil';

import moment from 'moment';

export const StartTimeAtom = atom({
  key: 'StartTimeAtom',
  default: moment(new Date()).format('YYYY-MM-DD'),
});

export const EndTimeAtom = atom({
  key: 'EndTimeAtom',
  default: moment(new Date()).format('YYYY-MM-DD'),
});
