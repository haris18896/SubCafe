import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// ** Custom Components
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Screens

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      initialRouteName={'MyDrawer'}
      backBehavior={'history'}
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        position: 'absolute',
        tabBarStyle: {
          backgroundColor: AppTheme.DefaultPalette().common.bottomBarBG,
          borderTopWidth: 0,
          height: AppTheme.HP('10'),
        },
      }}></Tab.Navigator>
  );
}

export default BottomTab;
