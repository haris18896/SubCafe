import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';

// ** Utils
import {getData, setData} from '../../utils/constants';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** third Party Packages
import CurrencyFormat from 'react-currency-format';
import * as IconsSolid from 'react-native-heroicons/solid';
import * as IconsOutline from 'react-native-heroicons/outline';

// ** Custom Components
import {
  DishImage,
  DishRowWrapper,
  DishRowContainer,
  DishTextContainer,
  DishCounterWrapper,
  DishCounterContainer,
} from '../../styles/components';
import {TextItem} from '../../styles/typography';

// ** Store && Actions
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from '../../redux/Basket';
import {useDispatch, useSelector} from 'react-redux';

const DishRow = ({
  id,
  name,
  price,
  image,
  quantity,
  isFavorited,
  toggleFavorite,
  restaurantId,
  description,
}) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const dispatch = useDispatch();

  const items = useSelector(state => selectBasketItemsWithId(state, id));

  const addItemToBasket = () => {
    dispatch(
      addToBasket({
        id,
        name,
        price,
        image,
        quantity,
        restaurantId,
        description,
      }),
    );
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
          <TouchableOpacity onPress={() => toggleFavorite(id, name, image)}>
            {isFavorited ? (
              <IconsSolid.HeartIcon
                size={40}
                color={AppTheme?.DefaultPalette()?.error?.main}
              />
            ) : (
              <IconsOutline.HeartIcon
                size={40}
                color={AppTheme?.DefaultPalette()?.error?.main}
              />
            )}
          </TouchableOpacity>
          <DishImage source={{uri: image}} />
        </DishRowWrapper>
      </DishRowContainer>

      {isPressed && (
        <DishCounterWrapper>
          <DishCounterContainer>
            <TouchableOpacity
              disabled={!items?.length}
              onPress={() => removeItemsFromBasket()}>
              <IconsSolid.MinusCircleIcon
                size={40}
                color={
                  items?.length > 0
                    ? AppTheme?.DefaultPalette()?.secondary?.main
                    : 'gray'
                }
              />
            </TouchableOpacity>
            <TextItem size={5}>{items?.length}</TextItem>
            <TouchableOpacity
              disabled={items?.length === quantity}
              onPress={() => addItemToBasket()}>
              <IconsSolid.PlusCircleIcon
                size={40}
                color={
                  items?.length === quantity
                    ? AppTheme?.DefaultPalette()?.grey[700]
                    : AppTheme?.DefaultPalette()?.primary?.main
                }
              />
            </TouchableOpacity>
          </DishCounterContainer>
        </DishCounterWrapper>
      )}
    </>
  );
};

export default DishRow;
