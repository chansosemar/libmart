import React from 'react';
import {View, Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {CustomSpacing, Layout} from '@styles';

interface Props {
  width?: number;
  height?: number;
  topSafeAreaHeight?: boolean;
  bottomSafeAreaHeight?: boolean;
}

const safeAreaHeight = {
  iphoneNotch: {
    top: 44,
    bottom: 34,
  },
  iphone: {
    top: 50,
    bottom: 0,
  },
  android: {
    top: 0,
    bottom: 0,
  },
};

const phoneType = () => {
  if (Platform.OS === 'ios') {
    return DeviceInfo.hasNotch() ? 'iphoneNotch' : 'iphone';
  }
  return 'android';
};

const Spacer = ({
  width,
  height,
  topSafeAreaHeight,
  bottomSafeAreaHeight,
}: Props) => {
  if (width) {
    return <View style={{width}} />;
  }

  if (height) {
    return <View style={{height}} />;
  }
  if (topSafeAreaHeight) {
    return <View style={{height: safeAreaHeight[phoneType()].top}} />;
  }

  if (bottomSafeAreaHeight) {
    return (
      <View
        style={{
          height: safeAreaHeight[phoneType()].bottom || CustomSpacing(24),
        }}
      />
    );
  }

  return <View style={Layout.flex} />;
};

Spacer.defaultProps = {
  width: undefined,
  height: undefined,
  topSafeAreaHeight: undefined,
  bottomSafeAreaHeight: undefined,
};

export default Spacer;
