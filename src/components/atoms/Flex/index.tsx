import styled from 'styled-components';

import { FlexProps } from './props';

const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${(props: FlexProps) => props.dir || 'row'};
  justify-content: ${(props: FlexProps) => props.justify || 'space-around'};
  align-items: ${(props: FlexProps) => props.align || 'space-between'};
`;

export default Flex;
