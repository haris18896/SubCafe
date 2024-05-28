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
  type,
  price,
  image,
  quantity,
  restaurantId,
  description,
}) => {
  const [isPressed, setIsPressed] = React.useState(false);
  const dispatch = useDispatch();

  const items = useSelector(state => selectBasketItemsWithId(state, id));

  // ** States
  const [isFavorited, setIsFavorited] = useState(false);

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

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const favoriteItems = await getData('favoriteItems');
        const parsedFavorites = favoriteItems ? JSON.parse(favoriteItems) : [];
        setIsFavorited(parsedFavorites.includes(id));
      } catch (error) {
        console.error('Failed to load favorites', error);
      }
    };
    checkFavorite().then(() => {});
  }, [id]);

  const addItemToFavorites = async () => {
    try {
      const favoriteItems = await getData('favoriteItems');
      const parsedFavorites = favoriteItems ? JSON.parse(favoriteItems) : [];
      const updatedFavorites = [...parsedFavorites, id];
      await setData('favoriteItems', JSON.stringify(updatedFavorites));
      setIsFavorited(true);
    } catch (error) {
      console.error('Failed to add favorite', error);
    }
  };

  const removeItemFromFavorites = async () => {
    try {
      const favoriteItems = await getData('favoriteItems');
      const parsedFavorites = favoriteItems ? JSON.parse(favoriteItems) : [];
      const updatedFavorites = parsedFavorites.filter(favId => favId !== id);
      await setData('favoriteItems', JSON.stringify(updatedFavorites));
      setIsFavorited(false);
    } catch (error) {
      console.error('Failed to remove favorite', error);
    }
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
          <TouchableOpacity
            onPress={
              isFavorited ? removeItemFromFavorites : addItemToFavorites
            }>
            {isFavorited ? (
              <IconsSolid.HeartIcon
                size={30}
                color={AppTheme?.DefaultPalette()?.error?.main}
              />
            ) : (
              <IconsOutline.HeartIcon
                size={30}
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
