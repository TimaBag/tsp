import { Link as ReactLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import Flex from 'components/atoms/Flex';
import { links, extraLinks } from './links';
import { ILink } from './props';

const Container = styled(Flex)`
  background: black;
`;

const Logo = styled.div`
  padding: 0 52px;
  text-align: center;
  color: white;
  margin: auto 0;
`;

const Div = styled(Flex)`
  margin-left: auto;
  padding-right: 40px;
  color: white;
`;

const Link = styled(ReactLink)<{ active?: boolean }>`
  color: ${(props) => (props.active ? 'white' : 'gray')};
  border-bottom: ${(props) => (props.active ? '4px solid #2958E5' : 'none')};
  padding: 20px;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
`;

const ExtraLink = styled(Link)`
  color: white;
  font-weight: normal;
`;

export default function Header(): JSX.Element {
  const location = useLocation();

  return (
    <Container justify="start">
      <Logo>TRADEHOUSE.KZ</Logo>
      {links.map((l: ILink, ind: number) => (
        <Link key={`${ind}_${l.href}`} to={l.href} active={location.pathname === l.href}>
          {l.title}
        </Link>
      ))}
      <Div>
        {extraLinks.map((l: ILink, ind: number) => (
          <ExtraLink key={`${ind}_{l.href}`} to={l.href}>
            {l.title}
          </ExtraLink>
        ))}
      </Div>
    </Container>
  );
}
