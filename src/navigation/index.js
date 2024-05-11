import React from 'react';

// ** Utils Styles
import {setTopLevelNavigator} from './utils';
import {theme as AppTheme} from '../@core/infrustructure/theme';

// ** navigators
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ** Stacks

// ** Custom Components
import {Loader} from '../@core/components';

// ** Screens
import {Splash} from '../screens';
import AppStack from './Stacks/AppStack';
import {AuthStack} from './Stacks/AuthStack';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer
      ref={setTopLevelNavigator}
      fallback={<Loader />}
      theme={{
        colors: {
          background: AppTheme.DefaultPalette().background?.paper,
        },
      }}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Splash'} component={Splash} />
        <Stack.Screen name="App" component={AppStack} />
        <Stack.Screen name="Auth" component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStack;
