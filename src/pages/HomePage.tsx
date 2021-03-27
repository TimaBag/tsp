import AppTemplate from 'templates/AppTemplate';
import styled from 'styled-components';

import NdsTable from 'components/molecules/NdsTable';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 40px;
`;

export default function HomePage(): JSX.Element {
  return (
    <div>
      <AppTemplate>
        <Grid>
          <NdsTable />
        </Grid>
      </AppTemplate>
    </div>
  );
}
