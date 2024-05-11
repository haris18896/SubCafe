import React from 'react';

// ** Utils
import {CommonStyles} from '../../utils/CommonStyles';

// ** Custom Components
import {AppBottomTab} from '../../utils/constants';
import {
  BottomTabButton,
  BottomTabBarWrapper,
  BottomTabButtonView,
  BottomTabIconWrapper,
} from '../../styles/infrustucture';
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
            <BottomTabButtonView style={CommonStyles.shadow}>
              <BottomTabIconWrapper active={isActive}>
                {isActive ? item?.iconActive : item?.icon}
              </BottomTabIconWrapper>
              {/*<BottomTabTextWrapper active={isActive}>*/}
              {/*  <BottomTabButtonText active={isActive}>*/}
              {/*    {item?.title}*/}
              {/*  </BottomTabButtonText>*/}
              {/*</BottomTabTextWrapper>*/}
            </BottomTabButtonView>
          </BottomTabButton>
        );
      })}
    </BottomTabBarWrapper>
  );
};

export default CustomTabBar;
