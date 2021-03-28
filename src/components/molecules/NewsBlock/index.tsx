import styled from 'styled-components';

const Div = styled.div`
  background-color: white;
  grid-column-start: 1;
  grid-column-end: 3;
`;

export default function NewsBlock(): JSX.Element {
  return <Div>Read More</Div>;
}
