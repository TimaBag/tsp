import { TextProps } from './types';

export const getTag = (variant: string, tag?: string): string => {
  if (variant === 'huge' || variant === 'heading-1' || variant === 'subheading-1') return 'h1';
  if (variant === 'heading-2' || variant === 'subheading-2') return 'h2';
  if (variant === 'heading-3' || variant === 'subheading-3') return 'h3';

  if (
    variant === 'text' ||
    variant === 'text-bold' ||
    variant === 'text-small' ||
    variant === 'text-small-bold'
  )
    return 'p';
  if (variant === 'text-micro' || variant === 'text-micro-bold') return 'span';
  return tag || 'p';
};

export const getTextProps = (variant: string): TextProps => {
  const textProps = {
    fontWeight: 'bold',
    fontSize: '69px',
    lineHeight: '100%',
  };
  // heading
  if (variant.includes('sub')) textProps.fontWeight = 'normal';
  if (variant.includes('1')) {
    textProps.fontSize = '53px';
    textProps.lineHeight = '120%';
  }
  if (variant.includes('sub')) textProps.fontWeight = 'normal';
  if (variant.includes('2')) {
    textProps.fontSize = '39px';
    textProps.lineHeight = '120%';
  }
  if (variant.includes('3')) {
    textProps.fontSize = '31px';
    textProps.lineHeight = '38px';
  }
  if (variant.includes('4')) {
    textProps.fontSize = '25px';
    textProps.lineHeight = '30px';
  }
  // body
  if (variant.includes('text')) {
    textProps.fontWeight = '500';
    textProps.fontSize = '18px';
    textProps.lineHeight = '28px';
  }
  if (variant.includes('bold')) {
    textProps.fontWeight = 'bold';
  }
  if (variant.includes('small')) {
    textProps.fontSize = '16px';
    textProps.lineHeight = '150%';
  }
  if (variant.includes('micro')) {
    textProps.fontSize = '14px';
    textProps.lineHeight = '150%';
  }
  return textProps;
};
