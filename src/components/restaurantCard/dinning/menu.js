import React from 'react';

// ** Utils
import {theme as AppTheme} from '../../../@core/infrustructure/theme';

// ** Third Party Packages

// ** Custom Packages
import {DinningWrapper} from '../../../styles/screens';
import {TextItem} from '../../../styles/typography';
import {useSelector} from 'react-redux';
import {Empty} from '../../../@core/components';
import DishRow from '../../dishRow/DishRow';

const Menu = () => {
  // ** Store
  const {menu} = useSelector(state => state?.restaurants);

  return (
    <DinningWrapper>
      <TextItem size={4} color={AppTheme?.DefaultPalette()?.grey[700]}>
        Menu
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
            image={dish?.image}
            description={dish?.description}
          />
        ))
      )}
    </DinningWrapper>
  );
};
export {Menu};
