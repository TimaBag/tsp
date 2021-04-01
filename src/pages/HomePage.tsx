import { Suspense } from 'react';
import AppTemplate from 'templates/AppTemplate';
import styled from 'styled-components';

import Loader from 'components/atoms/Loader';
import NdsTable from 'components/molecules/NdsTable';
import RealFacts from 'components/molecules/RealFacts';
import NewsBlock from 'components/molecules/NewsBlock';
import StrategicData from 'components/molecules/StrategicData';
import Map from 'components/organisms/Map';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 1.3fr 1.2fr;
  gap: 20px;
  padding: 40px;
`;

export default function HomePage(): JSX.Element {
  return (
    <div>
      <AppTemplate>
        <Grid>
          <NdsTable />
          <RealFacts />
          <Suspense fallback={<Loader />}>
            <NewsBlock />
          </Suspense>
          <StrategicData />
          <Map />
        </Grid>
      </AppTemplate>
    </div>
  );
}
