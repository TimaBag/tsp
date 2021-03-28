import { Link as ReactLink } from 'react-router-dom';
import styled from 'styled-components';

import { ReadMoreLinkProps } from './props';

const Link = styled(ReactLink)`
  position: absolute;
  right: 30px;
  top: 30px;
  text-decoration: none;
  font-size: 12px;
  line-height: 14px;
  color: #000000;
  background-image: url('chevron.svg');
  background-repeat: no-repeat;
  background-position: right;
  padding-right: 20px;
`;

export default function ReadMoreLink(props: ReadMoreLinkProps): JSX.Element {
  const { href, title } = props;

  return <Link to={href}>{title}</Link>;
}
