import React from 'react';

// ** Custom Components
import {AppBottomTab} from '../../utils/constants';
import {
  BottomTabButton,
  BottomTabBarWrapper,
  BottomTabButtonText,
  BottomTabButtonView,
} from '../../Styles/infrustucture';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

const CustomTabBar = ({state, navigation}) => {
  return (
    <BottomTabBarWrapper
      style={{
        shadowColor: AppTheme?.DefaultPalette().shadow?.color,
        shadowOffset: {width: 2, height: -1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
      }}>
      {AppBottomTab.map((item, index) => {
        const isActive = item.list.includes(state.routes[state.index].name);

        return (
          <BottomTabButton
            key={index}
            onPress={() => navigation.navigate(item.screen)}>
            <BottomTabButtonView>
              {isActive ? item?.iconActive : item?.icon}
              <BottomTabButtonText active={isActive}>
                {item?.title}
              </BottomTabButtonText>
            </BottomTabButtonView>
          </BottomTabButton>
        );
      })}
    </BottomTabBarWrapper>
  );
};

export default CustomTabBar;
