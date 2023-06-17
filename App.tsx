import React from 'react';
import {StatusBar} from 'react-native';
import MainNavigator from '@router';
import {Spacer} from '@components';
import {StoreProvider} from '@router/root.store';

const App = () => {
  return (
    <StoreProvider>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Spacer topSafeAreaHeight />
      <MainNavigator />
    </StoreProvider>
  );
};

export default App;
