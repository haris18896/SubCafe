import React from 'react';

// ** Utils Styles
import {setTopLevelNavigator} from './utils';
import {theme as AppTheme} from '../@core/infrustructure/theme';

// ** navigators
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ** Stacks
import AppStack from './stacks/AppStack';
import {AuthStack} from './stacks/AuthStack';

// ** Custom Components
import Loader from '../@core/components/loading';

// ** Screens
import {ResetPassword, Splash} from '../Screens';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['https://web.salushealth.io'],
  config: {
    screens: {
      ResetPassword: 'set-password/:token', // Define the path pattern for the ResetPassword screen
    },
  },
};

const MainStack = () => {
  return (
    <NavigationContainer
      linking={linking}
      ref={setTopLevelNavigator}
      fallback={<Loader />}
      theme={{
        colors: {
          background: AppTheme.DefaultPalette().background.paper,
        },
      }}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Splash'} component={Splash} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="App" component={AppStack} />
        <Stack.Screen name={'ResetPassword'} component={ResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainStack;
