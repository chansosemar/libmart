import React, {useState} from 'react';
import {VStack, HStack, Text, Spacer} from '@components';
import {Colors, CustomSpacing, dimensions} from '@styles';
import {observer} from 'mobx-react-lite';
import * as Animatable from 'react-native-animatable';
import {useStores} from '@router/root.store';
import styles from './Main.style';
import {
  ActivityIndicator,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';

import {CheckoutIcon, BackIcon, PickupIcon} from '@assets';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

const Main = observer(() => {
  const {mainStore} = useStores();
  const navigation = useNavigation();
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [showingGenre, setShowingGenre] = useState<boolean>(true);

  const handleSelectBookGenre = (key: string, name: string) => {
    const value = key.replace('/subjects/', '');
    mainStore.getListBooks(value);
    setSelectedGenre(name.toUpperCase());
    setShowingGenre(false);
  };

  const goToCheckout = () => {
    navigation.navigate('Checkout');
  };

  const RenderBooks = (data: any) => {
    const {authors, cover, edition_count, title} = data.data;
    const exist = mainStore.checkoutList?.find(e => e.title === title);

    return (
      <VStack style={styles.bookList}>
        <HStack>
          <VStack
            style={{
              alignSelf: 'flex-start',
            }}>
            <FastImage
              source={{uri: cover}}
              style={{
                width: CustomSpacing(80),
                height: dimensions.screenWidth * 0.23,
              }}
              resizeMode="contain"
            />
          </VStack>
          <VStack
            style={{
              maxWidth: dimensions.screenWidth * 0.6,
            }}>
            <VStack>
              <Text style={styles.booksTxt} type="bold">
                TITLE
              </Text>
              <Text style={styles.booksTxt}>{title}</Text>
            </VStack>
            <VStack>
              <Text style={styles.booksTxt} type="bold">
                AUTHOR
              </Text>
              <Text style={styles.booksTxt}>{authors}</Text>
            </VStack>
            <VStack>
              <Text style={styles.booksTxt} type="bold">
                EDITION
              </Text>
              <Text style={styles.booksTxt}>{edition_count}</Text>
            </VStack>
          </VStack>
        </HStack>
        <Spacer height={CustomSpacing(10)} />
        <Button
          color={exist ? Colors.RED : Colors.LIGHT_GREEN}
          title={exist ? 'UNSELECT' : 'SELECT'}
          onPress={() => {
            if (!exist) {
              mainStore.setCheckoutList(data.data);
            } else {
              mainStore.removeItemCheckoutList(title);
            }
          }}
        />
      </VStack>
    );
  };

  return (
    <VStack style={styles.container}>
      <HStack
        style={{
          justifyContent: 'space-between',
        }}>
        <Animatable.View duration={1000} animation="fadeInLeft" useNativeDriver>
          <HStack>
            <Text style={styles.headerTxt}>HELLO</Text>
            <Text style={styles.headerTxt} type="bold">
              {mainStore.userData?.name.toUpperCase()}
            </Text>
          </HStack>
          <Text style={styles.headerTypeTxt} type="bold">
            {`${mainStore.userData?.type.toUpperCase()} / ${
              mainStore.userData?.libId
            }`}
          </Text>
        </Animatable.View>
        <TouchableOpacity activeOpacity={0.8} onPress={goToCheckout}>
          <HStack>
            {mainStore.checkoutList !== null && (
              <Animatable.View
                duration={1000}
                animation="wobble"
                useNativeDriver>
                <VStack style={styles.counterCheckoutContainer}>
                  <Text
                    style={{
                      color: Colors.LIGHT,
                      fontSize: CustomSpacing(12),
                    }}
                    type="bold">
                    {mainStore.checkoutList.length}
                  </Text>
                </VStack>
                <FastImage
                  source={CheckoutIcon}
                  style={{
                    width: CustomSpacing(30),
                    height: CustomSpacing(35),
                  }}
                  resizeMode="cover"
                />
              </Animatable.View>
            )}
            <Spacer width={CustomSpacing(10)} />
            {mainStore.pickUpList !== null && (
              <Animatable.View
                duration={1000}
                animation="wobble"
                useNativeDriver>
                <VStack style={styles.counterCheckoutContainer}>
                  <Text
                    style={{
                      color: Colors.LIGHT,
                      fontSize: CustomSpacing(12),
                    }}
                    type="bold">
                    {mainStore.pickUpList.length}
                  </Text>
                </VStack>
                <FastImage
                  source={PickupIcon}
                  style={{
                    width: CustomSpacing(30),
                    height: CustomSpacing(35),
                  }}
                  resizeMode="cover"
                />
              </Animatable.View>
            )}
          </HStack>
        </TouchableOpacity>
      </HStack>
      <Spacer height={CustomSpacing(20)} />

      <VStack>
        <HStack
          style={{
            justifyContent: 'space-between',
          }}>
          {selectedGenre && (
            <Animatable.View
              duration={1000}
              animation="slideInLeft"
              useNativeDriver>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setSelectedGenre('');
                  setShowingGenre(true);
                }}>
                <HStack>
                  <FastImage
                    source={BackIcon}
                    style={{
                      width: CustomSpacing(15),
                      height: CustomSpacing(20),
                    }}
                    resizeMode="cover"
                  />
                  <Spacer width={CustomSpacing(10)} />
                  <Text style={styles.headerTxt}>
                    GO
                    <Text style={styles.headerTxt} type="bold">
                      BACK
                    </Text>
                  </Text>
                </HStack>
              </TouchableOpacity>
            </Animatable.View>
          )}
          <Animatable.View
            duration={1000}
            animation={selectedGenre ? 'slideInRight' : ''}
            useNativeDriver>
            <Text style={styles.headerTxt}>
              BOOKS
              <Text style={styles.headerTxt} type="bold">
                BY
              </Text>
              GENRE
            </Text>
          </Animatable.View>
        </HStack>
        <Spacer width={CustomSpacing(20)} />
        {selectedGenre && (
          <Animatable.View
            duration={1000}
            animation="slideInRight"
            useNativeDriver>
            <Text
              style={[
                styles.headerTxt,
                {
                  maxWidth: dimensions.screenWidth,
                  textAlign: 'right',
                },
              ]}
              type="bold">
              {selectedGenre}
            </Text>
          </Animatable.View>
        )}
      </VStack>

      <Spacer height={CustomSpacing(20)} />
      {showingGenre ? (
        <Animatable.View
          duration={1000}
          animation={showingGenre ? 'fadeInLeft' : 'fadeOutLeft'}
          useNativeDriver>
          <FlatList
            data={mainStore.getListSubjectResponse || []}
            keyExtractor={e => e.key}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleSelectBookGenre(item.key, item.name)}
                style={styles.subjectList}
                activeOpacity={0.5}>
                <Animatable.View
                  duration={1000}
                  animation="fadeInDown"
                  useNativeDriver>
                  <Text style={styles.subjectTxt} type="medium">
                    {item.name}
                  </Text>
                </Animatable.View>
              </TouchableOpacity>
            )}
            ListFooterComponent={() => {
              return <Spacer height={CustomSpacing(150)} />;
            }}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </Animatable.View>
      ) : (
        <Animatable.View
          duration={1000}
          animation={'fadeInRight'}
          useNativeDriver>
          {mainStore.getListBooksLoading && (
            <ActivityIndicator size={'large'} color={Colors.DARK} />
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              marginBottom: CustomSpacing(150),
            }}>
            {mainStore.getListBooksResponse &&
              !mainStore.getListBooksLoading &&
              mainStore.getListBooksResponse?.map((item, index) => {
                return (
                  <View key={`${item.title}-${index}`}>
                    <RenderBooks data={item} />
                  </View>
                );
              })}
          </ScrollView>
        </Animatable.View>
      )}
    </VStack>
  );
});

export default Main;
