import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

// ** third Party Packages
import CurrencyFormat from 'react-currency-format';
import * as Icons from 'react-native-heroicons/solid';

// ** Store && Actions
import {useDispatch, useSelector} from 'react-redux';
import {
  addToBasket,
  selectBasketItemsWithId,
  removeFromBasket,
} from '../../redux/Basket';
import {dummyRestaurant} from '../../utils/dummyData';
import {TextItem} from '../../styles/typography';

const DishRow = ({id, name, description, price, image}) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const dispatch = useDispatch();

  const items = useSelector(state => selectBasketItemsWithId(state, id));

  console.log('items...', items);

  const addItemToBasket = () => {
    dispatch(addToBasket({id, name, description, price, image}));
  };

  const removeItemsFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({id}));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <CurrencyFormat
              value={price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'PKR '}
              renderText={value => (
                <TextItem size={4} style={styles.price}>
                  {value}
                </TextItem>
              )}
            />
          </View>
          <Image source={{uri: dummyRestaurant}} style={styles.image} />
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View style={styles.container}>
          <View style={styles.counterContainer}>
            <TouchableOpacity
              disabled={!items?.length}
              onPress={() => removeItemsFromBasket()}>
              <Icons.MinusCircleIcon
                size={40}
                color={items?.length > 0 ? '#00ccbb' : 'gray'}
              />
            </TouchableOpacity>
            <Text>{items?.length}</Text>
            <TouchableOpacity onPress={() => addItemToBasket()}>
              <Icons.PlusCircleIcon size={40} color="#00ccbb" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: '#9CA3AF',
    marginBottom: 4,
  },
  price: {
    color: '#9CA3AF',
    marginTop: 8,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
});

export default DishRow;
