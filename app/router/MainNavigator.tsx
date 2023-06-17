import React, {useState, useEffect} from 'react';
import {TextInput, Button, Easing} from 'react-native';
import {observer} from 'mobx-react-lite';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import * as Progress from 'react-native-progress';
import Main from '@modules/Main';
import Checkout from '@modules/Checkout';
import {VStack, Text, HStack, Spacer} from '@components';
import * as Animatable from 'react-native-animatable';
import {Colors, CustomSpacing, dimensions} from '@styles';
import styles from './MainNavigator.style';
import {useStores} from './root.store';

type LoginType = {
  libId: string;
  pass: string;
};

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 100,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 250,
    easing: Easing.linear,
  },
};

const MainNavigator: React.FC = observer(() => {
  const {mainStore} = useStores();

  const [userLoginData, setUserLoginData] = useState<LoginType>({
    libId: '',
    pass: '',
  });

  useEffect(() => {
    mainStore.getListSubject();
  }, []);

  const WelcomeComponent = () => {
    const splashStyle = {
      fontSize: CustomSpacing(30),
      lineHeight: CustomSpacing(35),
    };
    return (
      <VStack>
        <HStack>
          <Text style={splashStyle}>WELCOME</Text>
          <Text style={splashStyle} type="bold">
            TO
          </Text>
        </HStack>
        <Text style={splashStyle} type="bold">
          LIBMART
        </Text>
      </VStack>
    );
  };

  if (mainStore.isSplashScreen) {
    const inputStyle = {
      fontSize: CustomSpacing(25),
    };
    const progress = 0;
    const indeterminate = true;
    return (
      <VStack
        style={{
          flex: mainStore.getListSubjectLoading ? 1 : 0,
          justifyContent: 'center',
          padding: CustomSpacing(20),
        }}>
        {mainStore.getListSubjectLoading && (
          <VStack>
            <WelcomeComponent />
            <Progress.Bar
              color={Colors.DARK}
              progress={progress}
              width={null}
              indeterminate={indeterminate}
            />
          </VStack>
        )}
        {!mainStore.getListSubjectLoading && (
          <Animatable.View duration={1000} animation="fadeInUp" useNativeDriver>
            <Spacer height={CustomSpacing(dimensions.screenHeight * 0.1)} />
            <WelcomeComponent />
            <VStack>
              <Spacer height={CustomSpacing(dimensions.screenHeight * 0.1)} />
              <HStack>
                <Text style={inputStyle}>LIB</Text>
                <Text style={inputStyle} type="bold">
                  ID
                </Text>
                <Spacer width={CustomSpacing(20)} />
                <TextInput
                  style={styles.textInputStyle}
                  keyboardType="numeric"
                  maxLength={6}
                  autoFocus
                  onChangeText={text =>
                    setUserLoginData({
                      libId: text,
                      pass: userLoginData.pass,
                    })
                  }
                  onFocus={() => mainStore.clearAuthenticatedError()}
                />
              </HStack>
              <HStack>
                <Text style={inputStyle}>PASS</Text>
                <Spacer width={CustomSpacing(20)} />
                <TextInput
                  style={styles.textInputStyle}
                  onChangeText={text =>
                    setUserLoginData({
                      libId: userLoginData.libId,
                      pass: text.toLowerCase(),
                    })
                  }
                  secureTextEntry
                  onFocus={() => mainStore.clearAuthenticatedError()}
                />
              </HStack>
            </VStack>
            <Spacer height={CustomSpacing(30)} />
            <Button
              onPress={() => {
                mainStore.authenticated(userLoginData);
              }}
              title="LOGIN"
              disabled={!userLoginData.libId || !userLoginData.pass}
            />
          </Animatable.View>
        )}
        <Spacer height={CustomSpacing(20)} />
        {mainStore.isAuthenticaterdError && (
          <Animatable.View duration={500} animation="fadeInUp" useNativeDriver>
            <Text
              style={{
                color: Colors.RED,
              }}>
              {mainStore.isAuthenticaterdError}
            </Text>
          </Animatable.View>
        )}
      </VStack>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
        }}>
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default MainNavigator;
