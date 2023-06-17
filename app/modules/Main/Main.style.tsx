import {CustomSpacing, Colors, dimensions} from '@styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIGHT,
    padding: CustomSpacing(20),
  },
  headerTxt: {
    fontSize: CustomSpacing(20),
  },
  headerTypeTxt: {
    fontSize: CustomSpacing(16),
  },
  subjectList: {
    flex: 1,
    flexDirection: 'column',
    margin: CustomSpacing(3),
    width: dimensions.screenWidth * 0.25,
    height: dimensions.screenWidth * 0.25,
    borderWidth: 2,
    borderColor: Colors.DARK,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CustomSpacing(10),
    padding: CustomSpacing(5),
  },
  bookList: {
    margin: CustomSpacing(3),
    borderWidth: 2,
    borderColor: Colors.DARK,
    borderRadius: CustomSpacing(10),
    padding: CustomSpacing(10),
  },
  subjectTxt: {
    textAlign: 'center',
    color: Colors.DARK,
    fontSize: CustomSpacing(15),
  },
  booksTxt: {
    color: Colors.DARK,
    fontSize: CustomSpacing(12),
  },
  counterCheckoutContainer: {
    width: CustomSpacing(15),
    height: CustomSpacing(15),
    borderRadius: CustomSpacing(20),
    backgroundColor: Colors.RED,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
  },
});

export default styles;
