import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';

const Div = styled.div`
  background: white;
  width: 260px;
  height: auto;
`;

const Link = styled(ReactLink)`
  display: block;
  font-size: 16px;
  padding: 20px;
  padding-left: 30px;
  margin-left: 10px;
  text-decoration: none;
  color: gray;
  background: url('petroleum.svg');
  background-position: left;
  background-size: 20px;
  background-repeat: no-repeat;
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
