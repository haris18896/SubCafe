import React from 'react';

// ** Utils
import {theme as AppTheme} from '../../../@core/infrustructure/theme';

// ** Third Party Packages
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// ** Custom Components
import {DinningOption, DinningWrapper} from '../../../styles/screens';
import {LinearButton} from '../../buttons/LinearButton';

const DinningOptions = props => {
  const {type, onPress} = props;

  const options = [
    {
      title: 'Food Delivery',
      value: 'delivery',
      icon: (
        <Icon
          name={'food'}
          size={AppTheme?.WP(8)}
          color={AppTheme?.DefaultPalette()?.common?.white}
        />
      ),
    },
    {
      title: 'Table Booking',
      value: 'booking',
      icon: (
        <Icon
          name={'sofa-single'}
          size={AppTheme?.WP(8)}
          color={AppTheme?.DefaultPalette()?.common?.white}
        />
      ),
    },
    {
      title: 'Special Order',
      value: 'specialOrder',
      icon: (
        <Icon
          name={'food-turkey'}
          size={AppTheme?.WP(8)}
          color={AppTheme?.DefaultPalette()?.common?.white}
        />
      ),
    },
  ];

  return (
    <DinningWrapper>
      {options.map((option, index) => (
        <DinningOption key={index}>
          <LinearButton
            size={{
              height: 13,
            }}
            title={option?.title}
            onPress={() => onPress(option?.value)}
            icon={option?.icon}
          />
        </DinningOption>
      ))}
    </DinningWrapper>
  );
};
export {DinningOptions};
