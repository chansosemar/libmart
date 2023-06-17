import {CustomSpacing, Colors, dimensions} from '@styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textInputStyle: {
    paddingHorizontal: CustomSpacing(8),
    minHeight: CustomSpacing(60),
    fontFamily: 'Poppins-Medium',
    fontSize: CustomSpacing(20),
    color: Colors.DARK,
    borderBottomColor: Colors.DARK,
    borderBottomWidth: 1,
    width: dimensions.screenWidth * 0.6,
  },
});

export default styles;
