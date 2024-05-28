import React, {useState, useEffect} from 'react';

// ** Utils
import {getData, setData} from '../../../utils/constants';
import {theme as AppTheme} from '../../../@core/infrustructure/theme';

// ** Third Party Packages

// ** Custom Packages
import DishRow from '../../dishRow/DishRow';
import {Empty} from '../../../@core/components';
import {TextItem} from '../../../styles/typography';
import {DinningWrapper} from '../../../styles/screens';

// ** Store && Actions
import {useSelector} from 'react-redux';

const Menu = props => {
  const {type} = props;

  // ** Store
  const {menu} = useSelector(state => state?.restaurants);

  // ** States
  const [favoriteItems, setFavoriteItems] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favoriteItems = await getData('favoriteItems');
        const parsedFavorites = favoriteItems ? JSON.parse(favoriteItems) : [];
        setFavoriteItems(parsedFavorites);
      } catch (error) {
        console.error('Failed to load favorites', error);
      }
    };
    loadFavorites().then(() => {});
  }, []);

  const toggleFavorite = async (id, name, image) => {
    try {
      let updatedFavorites = [...favoriteItems];
      const index = updatedFavorites.findIndex(item => item.id === id);

      if (index !== -1) {
        updatedFavorites.splice(index, 1);
      } else {
        updatedFavorites.push({id, name, image});
      }

      setFavoriteItems(updatedFavorites);
      await setData('favoriteItems', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Failed to update favorite', error);
    }
  };

  return (
    <DinningWrapper>
      <TextItem
        style={{marginBottom: AppTheme?.WP(1)}}
        size={4}
        color={AppTheme?.DefaultPalette()?.grey[800]}>
        Menu{' '}
        {type === 'takeAway' && (
          <TextItem size={4} color={AppTheme?.DefaultPalette()?.grey[800]}>
            {' '}
            Take Away
          </TextItem>
        )}
      </TextItem>

      {menu.length === 0 ? (
        <Empty title={'No Dishes Available'} />
      ) : (
        menu.map((dish, index) => (
          <DishRow
            key={index}
            id={dish?._id}
            name={dish?.name}
            price={dish?.price}
            quantity={dish?.quantity}
            description={dish?.description}
            toggleFavorite={toggleFavorite}
            restaurantId={dish?.resturant_id}
            image={`data:image/png;base64,${dish?.image}`}
            isFavorited={favoriteItems.some(item => item.id === dish?._id)}
          />
        ))
      )}
    </DinningWrapper>
  );
};
export {Menu};
