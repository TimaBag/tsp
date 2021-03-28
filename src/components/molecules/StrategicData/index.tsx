import styled from 'styled-components';

import Typography from 'components/atoms/NedoTypography';
import Flex from 'components/atoms/Flex';

import { numbers } from './numbers';
import { INumber } from './types';

const Div = styled.div`
  background-color: white;
  grid-column-start: 1;
  grid-column-end: 3;
  padding: 20px;
`;

export default function StrategicData(): JSX.Element {
  return (
    <Div>
      <Typography variant="text" color="#000">
        СТРАТЕГИЧЕСКИЕ ДАННЫЕ ПО РЫНКУ:
      </Typography>
      <Flex align="center">
        {numbers.map((num: INumber, i: number) => (
          <div style={{ textAlign: 'center' }} key={`${num.title}_${i}`}>
            <Typography variant="heading-1" color={num.title === 'ГЗС' ? '#007EF3' : '#000'}>
              {num.value.toString()}
            </Typography>
            <Typography variant="text-small" color="#000">
              {num.title}
            </Typography>
          </div>
        ))}
      </Flex>
    </Div>
  );
}
