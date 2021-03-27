import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  background: gray;
  width: 260px;
  height: 100vh;
`;

const Link = styled(ReactLink)`
  display: block;
  font-size: 16px;
  padding: 10px 20px;
`;

export default function Sidebar(): JSX.Element {
  return (
    <Div>
      <Link to="/">НЕФТЕПРОДУКТЫ</Link>
      <Link to="/">НЕФТЬ</Link>
      <Link to="/">ДРУГИЕ РЕСУРСЫ</Link>
    </Div>
  );
}
