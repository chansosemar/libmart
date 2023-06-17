import * as Colors from './Color';
import {Dimensions} from 'react-native';
import {CustomSpacing} from './Spacing';
import Layout from './Layout';

const {width, height} = Dimensions.get('window');
const dimensions: {
  screenWidth: number;
  screenHeight: number;
} = {
  screenWidth: width < height ? width : height,
  screenHeight: height,
};

export {Colors, CustomSpacing, Layout, dimensions};
