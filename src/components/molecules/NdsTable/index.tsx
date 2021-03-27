import styled from 'styled-components';

import Typography from 'components/atoms/NedoTypography';
import { rows } from './mock';

const Div = styled.div`
  padding: 16px;
  background: white;
`;

const Table = styled.table`
  border-collapse: collapse;
  font-size: 12px;
`;

const Td = styled.td`
  border: 1px solid #dbdbdb;
  text-align: left;
  padding: 8px;
`;

const Th = styled.th`
  border: 1px solid #dbdbdb;
  text-align: left;
  padding: 8px;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export default function NdsTable(): JSX.Element {
  return (
    <Div>
      <Typography variant="text" color="#000">
        НДС ПОШЛИНЫ
      </Typography>
      <Table>
        <Tr>
          <Th>налог/нефтепродукт</Th>
          <Th>КАЗАХСТАН</Th>
          <Th>КИРГИЗИЯ</Th>
          <Th>ТАДЖИКИСТАН</Th>
          <Th>РОССИЯ</Th>
        </Tr>
        {rows.map((row: string[], ind: number) => (
          <Tr key={`row_${ind}`}>
            {row.map((cell: string, i: number) => (
              <Td key={`cell_${i}`}>{cell}</Td>
            ))}
          </Tr>
        ))}
      </Table>
    </Div>
  );
}
