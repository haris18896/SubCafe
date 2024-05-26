import React from 'react';
import {Text, StyleSheet} from 'react-native';

// ** Third Party Packages
import CurrencyFormat from 'react-currency-format';
import {useNavigation} from '@react-navigation/native';

// ** Cusotm Components
import {
  CountView,
  BasketButton,
  BasketContainer,
} from '../../styles/components';
import {TextItem} from '../../styles/typography';

// ** Store && Actions
import {useSelector} from 'react-redux';
import {selectBasketItems, selectBasketTotal} from '../../redux/Basket';

const BasketIcon = () => {
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);
  const items = useSelector(selectBasketItems);

  if (items?.length === 0) return null;

  return (
    <BasketContainer>
      <BasketButton onPress={() => navigation.navigate('Basket')}>
        <CountView>
          <TextItem style={styles.itemCount}>{items?.length}</TextItem>
        </CountView>
        <TextItem
          size={4}
          color={'white'}
          weight={'semiBold'}
          family={'PoppinsSemiBold'}>
          View Basket
        </TextItem>
        <CurrencyFormat
          value={basketTotal ? basketTotal.toFixed(2) : 0}
          displayType={'text'}
          thousandSeparator={true}
          thousandSpacing="2"
          prefix={'PKR '}
          renderText={value => (
            <TextItem
              size={4}
              color={'white'}
              weight={'semiBold'}
              family={'PoppinsSemiBold'}>
              {value}
            </TextItem>
          )}
        />
      </BasketButton>
    </BasketContainer>
  );
};

const styles = StyleSheet.create({
  itemCount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  totalText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export {BasketIcon};
