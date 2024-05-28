import React from 'react';

// ** Utils
import {theme as AppTheme} from '../../../@core/infrustructure/theme';

// ** Third Party Packages

// ** Custom Packages
import {DinningWrapper} from '../../../styles/screens';
import {TextItem} from '../../../styles/typography';
import {useSelector} from 'react-redux';
import {CheckBox, Empty} from '../../../@core/components';
import DishRow from '../../dishRow/DishRow';

const Menu = props => {
  const {type} = props;

  // ** Store
  const {menu} = useSelector(state => state?.restaurants);

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
            image={dish?.image}
            description={dish?.description}
          />
        ))
      )}
    </DinningWrapper>
  );
};
export {Menu};
