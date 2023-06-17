import {CustomSpacing, Colors, dimensions} from '@styles';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LIGHT,
    padding: CustomSpacing(20),
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
    right: -CustomSpacing(20),
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
  bookList: {
    margin: CustomSpacing(3),
    borderWidth: 2,
    borderColor: Colors.DARK,
    borderRadius: CustomSpacing(10),
    padding: CustomSpacing(10),
  },
  headerTxt: {
    fontSize: CustomSpacing(15),
  },
});

export default styles;
