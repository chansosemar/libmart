import React, {useState} from 'react';
import {VStack, HStack, Text, Spacer} from '@components';
import {Colors, CustomSpacing, dimensions} from '@styles';
import {observer} from 'mobx-react-lite';
import {useStores} from '@router/root.store';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import {BackIcon} from '@assets';

import styles from './Checkout.style';
import {
  ActivityIndicator,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  FlatList,
} from 'react-native';

const Checkout = observer(() => {
  const navigation = useNavigation();
  const {mainStore} = useStores();
  const [date, setDate] = useState(new Date());
  const [isCalendarOpen, setOpenCalendar] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<number>(1);

  const listPage = [
    {
      id: 1,
      title: 'Checkout List',
    },
    {
      id: 2,
      title: 'Scheduled Pickup',
    },
  ];

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const RenderBooks = (data: any) => {
    const {authors, cover, edition_count, title} = data.data;

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
        {currentTab === 1 && (
          <>
            <Spacer height={CustomSpacing(10)} />
            <Button
              color={Colors.RED}
              title={'REMOVE'}
              onPress={() => {
                mainStore.removeItemCheckoutList(title);
              }}
            />
          </>
        )}
      </VStack>
    );
  };

  return (
    <VStack style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={goBack}>
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
      <Spacer height={CustomSpacing(20)} />
      <HStack
        style={{
          justifyContent: 'space-around',
        }}>
        {listPage.map(e => {
          const isExistCheckout = e.id === 1 && mainStore.checkoutList !== null;
          const isExistPickUp = e.id === 2 && mainStore.pickUpList !== null;

          const Notif = () => {
            return (
              <VStack style={styles.counterCheckoutContainer}>
                <Text
                  style={{
                    color: Colors.LIGHT,
                    fontSize: CustomSpacing(12),
                  }}
                  type="bold">
                  {e.id === 1
                    ? mainStore.checkoutList?.length
                    : mainStore.pickUpList?.length}
                </Text>
              </VStack>
            );
          };

          return (
            <TouchableOpacity
              key={e.id}
              activeOpacity={0.8}
              onPress={() => {
                setCurrentTab(e.id);
              }}>
              <VStack
                style={{
                  borderBottomColor:
                    e.id === currentTab ? Colors.DARK : Colors.LIGHT,
                  borderBottomWidth: 1,
                }}>
                {isExistCheckout && <Notif />}
                {isExistPickUp && <Notif />}

                <Text>{e.title}</Text>
              </VStack>
            </TouchableOpacity>
          );
        })}
      </HStack>
      <Spacer height={CustomSpacing(20)} />
      {currentTab === 1 && (
        <Animatable.View
          duration={1000}
          animation={'fadeInRight'}
          useNativeDriver
          style={{
            flex: 1,
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              marginBottom: CustomSpacing(75),
            }}>
            {mainStore.checkoutList !== null &&
              mainStore.checkoutList?.map((item, index) => {
                return (
                  <View key={`${item.title}-${index}`}>
                    <RenderBooks data={item} />
                  </View>
                );
              })}
            {mainStore.checkoutList === null && (
              <VStack
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>EMPTY BOOKS, PLEASE SELECT BOOK FIRST</Text>
              </VStack>
            )}
          </ScrollView>
          <VStack
            style={{
              position: 'absolute',
              bottom: CustomSpacing(20),
              alignSelf: 'center',
              width: dimensions.screenWidth * 0.8,
            }}>
            <Button
              onPress={() => {
                setOpenCalendar(true);
              }}
              disabled={mainStore.checkoutList === null}
              title="CONFIRM SCHEDULE"
            />
          </VStack>
        </Animatable.View>
      )}
      {currentTab === 2 && (
        <Animatable.View
          duration={1000}
          animation={'fadeInRight'}
          useNativeDriver
          style={{
            flex: 1,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {mainStore.pickUpList !== null &&
              mainStore.pickUpList?.map((item, index) => {
                return (
                  <View key={`${index}`}>
                    <Text
                      style={{
                        fontSize: CustomSpacing(15),
                        textAlign: 'center',
                      }}
                      type="bold">
                      {item.date.toDateString()}
                    </Text>
                    {item.data?.map((e, i) => {
                      return (
                        <VStack key={i}>
                          <RenderBooks data={e} />
                        </VStack>
                      );
                    })}
                  </View>
                );
              })}
            {mainStore.pickUpList === null && (
              <VStack
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>EMPTY PICK UP, PLEASE CONFIRM SCHEDULE FIRST</Text>
              </VStack>
            )}
          </ScrollView>
        </Animatable.View>
      )}
      <DatePicker
        modal
        mode="date"
        open={isCalendarOpen}
        date={new Date()}
        minimumDate={new Date()}
        onConfirm={date => {
          setOpenCalendar(false);
          mainStore.setPickUpList({
            data: mainStore.checkoutList,
            date,
          });
          setCurrentTab(2);
        }}
        onCancel={() => {
          setOpenCalendar(false);
        }}
      />
    </VStack>
  );
});

export default Checkout;
