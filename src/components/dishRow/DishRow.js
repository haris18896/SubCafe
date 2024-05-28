import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

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
import {
  DishCounterContainer,
  DishCounterWrapper,
  DishImage,
  DishRowContainer,
  DishRowWrapper,
  DishTextContainer,
} from '../../styles/components';

const DishRow = ({id, name, type, description, price, image}) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const dispatch = useDispatch();

  const items = useSelector(state => selectBasketItemsWithId(state, id));

  const addItemToBasket = () => {
    dispatch(addToBasket({id, name, description, price, image}));
  };

  const removeItemsFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({id}));
  };

  return (
    <>
      <DishRowContainer onPress={() => setIsPressed(!isPressed)}>
        <DishRowWrapper>
          <DishTextContainer>
            <TextItem
              size={4.5}
              weight={'bold'}
              family={'PoppinsBold'}
              color={AppTheme?.DefaultPalette()?.grey[800]}>
              {name}
            </TextItem>
            <TextItem size={3.5} color={AppTheme?.DefaultPalette()?.grey[600]}>
              {description}
            </TextItem>
            <CurrencyFormat
              value={price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'PKR '}
              renderText={value => (
                <TextItem
                  size={4}
                  color={AppTheme?.DefaultPalette()?.grey[600]}>
                  {value}
                </TextItem>
              )}
            />
          </DishTextContainer>
          <DishImage source={{uri: dummyRestaurant}} />
        </DishRowWrapper>
      </DishRowContainer>

      {isPressed && (
        <DishCounterWrapper>
          <DishCounterContainer>
            <TouchableOpacity
              disabled={!items?.length}
              onPress={() => removeItemsFromBasket()}>
              <Icons.MinusCircleIcon
                size={40}
                color={
                  items?.length > 0
                    ? AppTheme?.DefaultPalette()?.secondary?.main
                    : 'gray'
                }
              />
            </TouchableOpacity>
            <TextItem size={5}>{items?.length}</TextItem>
            <TouchableOpacity onPress={() => addItemToBasket()}>
              <Icons.PlusCircleIcon
                size={40}
                color={AppTheme?.DefaultPalette()?.primary?.main}
              />
            </TouchableOpacity>
          </DishCounterContainer>
        </DishCounterWrapper>
      )}
    </>
  );
};

export default DishRow;
