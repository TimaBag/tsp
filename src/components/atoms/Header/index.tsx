import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { FlexProps } from './props';

const links = [
  '/',
  'news',
  'partners',
  'transportation',
  'trading',
  'storage',
  'login',
  'register',
];

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props: FlexProps) => props.dir || 'row'};
  justify-content: ${(props: FlexProps) => props.justify || 'space-around'};
  align-items: ${(props: FlexProps) => props.align || 'space-between'};
`;

export default function Header(): JSX.Element {
  return (
    <Flex>
      {links.map((l: string) => (
        <Link key={l} to={l}>
          {l}
        </Link>
      ))}
    </Flex>
  );
}
