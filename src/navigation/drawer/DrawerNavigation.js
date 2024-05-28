import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// ** Utils
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Custom Components
import SideMenu from './sideMenu';

// ** Screens
import {Basket, Profile, Dashboard} from '../../screens';

const Drawer = createDrawerNavigator();

export function MyDrawer() {
  return (
    <Drawer.Navigator
      backBehavior={'history'}
      initialRouteName={'Dashboard'}
      drawerContent={props => <SideMenu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: AppTheme?.DefaultPalette()?.primary?.dark,
          paddingVertical: AppTheme?.WP(5),
          width: AppTheme?.scrWidth / 1.3,
        },
      }}>
      <Drawer.Screen name={'Dashboard'} component={Dashboard} />
      <Drawer.Screen name={'Basket'} component={Basket} />
      <Drawer.Screen name={'Profile'} component={Profile} />
    </Drawer.Navigator>
  );
}
