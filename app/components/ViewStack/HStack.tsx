import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import {Layout} from '@styles';

import {
  VerticalAlignment,
  VerticalAlignmentStrings,
  ViewStackProps,
} from './Types.ViewStack';

interface Props extends ViewStackProps {
  alignment?: VerticalAlignmentStrings;
}

const HStack: React.FC<Props> = ({
  children,
  padding,
  top,
  right,
  bottom,
  left,
  horizontal,
  vertical,
  alignment = 'center',
  style,
  ...props
}) => {
  const paddingStyles: StyleProp<ViewStyle> = {
    alignItems: VerticalAlignment[alignment],
    paddingTop: top,
    paddingRight: right,
    paddingBottom: bottom,
    paddingLeft: left,
    paddingHorizontal: horizontal,
    paddingVertical: vertical,
    padding,
  };

  return (
    <View style={[paddingStyles, style, Layout.flexRow]} {...props}>
      {children}
    </View>
  );
};

export default HStack;
