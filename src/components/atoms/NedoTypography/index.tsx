// import { createElement } from 'react';
import styled from 'styled-components';

import { TypographyProps } from './props';
import { TextProps } from './types';
import { getTextProps } from './utils';

const Text = styled.div<TextProps>`
  font-family: Montserrat;
  font-style: normal;
  font-size: ${(props: TextProps) => props.fontSize || '53px'};
  line-height: ${(props: TextProps) => props.lineHeight || '120%'};
  font-weight: ${(props: TextProps) => props.fontWeight || 'normal'};
  color: ${(props: TextProps) => props.color || '#2958E5'};
`;

export default function Typography(props: TypographyProps): JSX.Element {
  const { variant, children, color } = props;
  const textProps = getTextProps(variant);
  // const Tag = createElement(getTag(variant, tag));
  return (
    <Text
      fontSize={textProps.fontSize}
      fontWeight={textProps.fontWeight}
      lineHeight={textProps.lineHeight}
      color={color}
    >
      {children}
    </Text>
  );
}
