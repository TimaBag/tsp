import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import { StartTimeAtom, EndTimeAtom } from 'store/state/calendar';
import moment from 'moment';
import 'moment/locale/ru';

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
`;

const Input = styled.input`
  border: 2px solid blue;
  padding: 4px;
`;

export default function Calendar(): JSX.Element {
  const [startTime, setStartTime] = useRecoilState(StartTimeAtom);
  const [endTime, setEndTime] = useRecoilState(EndTimeAtom);

  const [startDay, startMonth] = moment(startTime).format('LL').split(' ');
  const [endDay, endMonth] = moment(endTime).format('LL').split(' ');

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStartTime(e.target.value);
  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEndTime(e.target.value);

  return (
    <Div>
      <Input value={startTime} onChange={handleStartTimeChange} type="date" />
      <Input value={endTime} onChange={handleEndTimeChange} type="date" />
      <p>{`${startDay} ${startMonth}`}</p>
      <p>{`${endDay} ${endMonth}`}</p>
      <p>{moment(startTime).format('dddd')}</p>
      <p>{moment(endTime).format('dddd')}</p>
      <p>{moment(startTime).year()}</p>
      <p>{moment(endTime).year()}</p>
    </Div>
  );
}
