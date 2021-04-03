import { Suspense } from 'react';
import AppTemplate from 'templates/AppTemplate';
import styled from 'styled-components';

import Loader from 'components/atoms/Loader';
import NdsTable from 'components/molecules/NdsTable';
import RealFacts from 'components/molecules/RealFacts';
import NewsBlock from 'components/molecules/NewsBlock';
import StrategicData from 'components/molecules/StrategicData';
import Map from 'components/organisms/Map';
import Flex from 'components/atoms/Flex';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 360px 200px;
  gap: 20px;
  padding: 40px;
`;

const Div = styled.div`
  position: relative;
  grid-column: 1 / 3;
`;

const Placeholder = styled.div`
  width: 48%;
  height: auto;
  background: white;
  background-image: url('chart_placeholder.png');
  background-size: 70% 100%;
  background-position: center center;
  background-repeat: no-repeat;
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
          <Div>
            <Flex justify="space-between" style={{ position: 'relative' }}>
              <Map />
              <Placeholder />
            </Flex>
          </Div>
        </Grid>
      </AppTemplate>
    </div>
  );
}
