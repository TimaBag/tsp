import styled from 'styled-components';

const Div = styled.div`
  grid-column: 1 / 3;
`;

export default function Map(): JSX.Element {
  return <Div id="map" style={{ width: '100%', height: '698px' }} />;
}
