import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import CurrencyFormat from 'react-currency-format';
import * as Icons from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';

// ** Custom Packages
import {
  BasketScreenHeader,
  BasketScreenWrapper,
  BasketScreenContainer,
  BasketScreenCloseIcon,
  BasketGroupItemsWrapper,
  DishImage,
  SubTotalContainer,
  PlaceOrderButton,
} from '../../styles/screens';
import {TextItem} from '../../styles/typography';

// ** Store && Actions
import {
  selectBasketItems,
  selectBasketTotal,
  removeFromBasket,
} from '../../redux/Basket';
import {useDispatch, useSelector} from 'react-redux';
import {selectRestaurant} from '../../redux/Restaurant';

// ** Dummy Data
import {dummyRestaurant} from '../../utils/dummyData';

const Basket = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <BasketScreenWrapper>
      <BasketScreenContainer>
        <BasketScreenHeader>
          <View>
            <TextItem
              weight={'bold'}
              family={'PoppinsBold'}
              size={4.5}
              color={AppTheme?.DefaultPalette()?.grey[800]}>
              Basket
            </TextItem>
            <TextItem size={3.5} color={AppTheme?.DefaultPalette()?.grey[500]}>
              {restaurant.title}
            </TextItem>
          </View>
          <BasketScreenCloseIcon onPress={() => navigation.goBack()}>
            <Icons.XCircleIcon
              color={AppTheme?.DefaultPalette()?.primary?.main}
              size={AppTheme?.WP(10)}
            />
          </BasketScreenCloseIcon>
        </BasketScreenHeader>

        <View style={styles.deliveryContainer}>
          <Image
            source={{uri: 'https://links.papareact.com/wru'}}
            style={{
              height: AppTheme?.WP(10),
              width: AppTheme?.WP(10),
              borderRadius: 999,
            }}
          />
          <TextItem size={3.5} color={AppTheme?.DefaultPalette()?.grey[500]}>
            Deliver in 50 - 75 mints
          </TextItem>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <TextItem
              size={3.5}
              color={AppTheme?.DefaultPalette()?.primary?.main}>
              Change
            </TextItem>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {Object.entries(groupedItemsInBasket).map(([key, items]) => {
            return (
              <BasketGroupItemsWrapper key={key}>
                <TextItem
                  style={{marginRight: AppTheme?.WP(3)}}
                  size={3.5}
                  color={AppTheme?.DefaultPalette()?.primary?.main}>
                  {items.length} x
                </TextItem>
                <DishImage source={{uri: dummyRestaurant}} />
                <TextItem
                  size={3.5}
                  color={AppTheme?.DefaultPalette()?.grey[500]}
                  style={{flex: 1}}>
                  {items[0]?.name}
                </TextItem>
                <CurrencyFormat
                  value={items[0]?.price.toFixed(2)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'£ '}
                  renderText={value => (
                    <TextItem
                      size={3.5}
                      color={AppTheme?.DefaultPalette()?.grey[500]}>
                      {value}
                    </TextItem>
                  )}
                />
                <TouchableOpacity
                  onPress={() => dispatch(removeFromBasket({id: key}))}>
                  <TextItem
                    style={{marginLeft: AppTheme?.WP(2)}}
                    size={3.5}
                    color={AppTheme?.DefaultPalette()?.secondary?.main}>
                    Remove
                  </TextItem>
                </TouchableOpacity>
              </BasketGroupItemsWrapper>
            );
          })}

          <SubTotalContainer>
            <TextItem size={3.7} color={AppTheme?.DefaultPalette()?.grey[500]}>
              SubTotal
            </TextItem>
            <CurrencyFormat
              value={basketTotal.toFixed(2)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'£ '}
              renderText={value => (
                <TextItem
                  size={3.7}
                  weight={'bold'}
                  family={'PoppinsBold'}
                  color={AppTheme?.DefaultPalette()?.grey[800]}>
                  {value}
                </TextItem>
              )}
            />
          </SubTotalContainer>
          <SubTotalContainer>
            <TextItem size={3.7} color={AppTheme?.DefaultPalette()?.grey[500]}>
              Delivery Fee
            </TextItem>

            <CurrencyFormat
              value={(5.99).toFixed(2)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'£ '}
              renderText={value => (
                <TextItem
                  size={3.7}
                  weight={'bold'}
                  family={'PoppinsBold'}
                  color={AppTheme?.DefaultPalette()?.grey[800]}>
                  {value}
                </TextItem>
              )}
            />
          </SubTotalContainer>
          <SubTotalContainer>
            <TextItem size={3.7} color={AppTheme?.DefaultPalette()?.grey[500]}>
              Order Total
            </TextItem>
            <CurrencyFormat
              value={(5.99 + basketTotal).toFixed(2)}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'£ '}
              renderText={value => (
                <TextItem
                  weight={'bold'}
                  family={'PoppinsBold'}
                  size={3.7}
                  color={AppTheme?.DefaultPalette()?.grey[800]}>
                  {value}
                </TextItem>
              )}
            />
          </SubTotalContainer>
        </ScrollView>

        <PlaceOrderButton onPress={() => navigation.navigate('PreparingOrder')}>
          <TextItem style={{textAlign: 'center'}} color={'white'} size={4.5}>
            Place Order
          </TextItem>
        </PlaceOrderButton>
      </BasketScreenContainer>
    </BasketScreenWrapper>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  restaurantText: {
    color: '#9CA3AF',
    marginLeft: 10,
  },

  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    marginBottom: 5,
  },
  deliveryText: {
    flex: 1,
    textAlign: 'center',
  },
  itemCountText: {
    color: '#00ccbb',
    marginRight: 10,
  },

  removeText: {
    color: '#00ccbb',
    fontSize: 14,
    marginLeft: 10,
  },
});

export {Basket};
