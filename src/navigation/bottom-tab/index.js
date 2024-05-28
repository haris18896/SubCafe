import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// ** Custom Components
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Custom Components
import CustomTabBar from './CustomBottomTab';

// ** Screens
import {Basket, Dashboard, Profile} from '../../screens';

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
      }}>
      <Tab.Screen name={'Dashboard'} component={Dashboard} />
      <Tab.Screen name={'Profile'} component={Profile} />
      <Tab.Screen name={'Basket'} component={Basket} />
    </Tab.Navigator>
  );
}

export default BottomTab;
