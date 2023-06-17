import React from 'react';
import {Text, StyleSheet, TextProps} from 'react-native';
import {Colors} from '@styles';

export interface DefaultTextProps extends TextProps {
  type?: 'medium' | 'bold' | 'regular';
  children: string | React.ReactNode;
}

const TextComponent = ({
  type = 'regular',
  style,
  children,
  ...props
}: DefaultTextProps) => {
  let fontFamily = 'Poppins-Regular';

  switch (type) {
    case 'medium':
      fontFamily = 'Poppins-Medium';
      break;
    case 'bold':
      fontFamily = 'Poppins-Bold';
      break;
    case 'regular':
      fontFamily = 'Poppins-Regular';
      break;
    default:
      fontFamily = 'Poppins-Regular';
      break;
  }

  return (
    <Text
      {...props}
      style={StyleSheet.flatten([
        {
          fontFamily: fontFamily,
          color: Colors.DARK,
        },
        style,
      ])}>
      {children}
    </Text>
  );
};

export default TextComponent;
