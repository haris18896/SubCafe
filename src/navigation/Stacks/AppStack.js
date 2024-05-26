import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ** Screens
import {
  Basket,
  Payment,
  Profile,
  Dashboard,
  Restaurant,
  CheckoutComplete,
} from '../../screens';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName={'Dashboard'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Dashboard'} component={Dashboard} />
      <Stack.Screen
        name={'Basket'}
        component={Basket}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <Stack.Screen name={'Profile'} component={Profile} />
      <Stack.Screen name={'Payment'} component={Payment} />
      <Stack.Screen name={'Restaurant'} component={Restaurant} />
      <Stack.Screen name={'CheckoutComplete'} component={CheckoutComplete} />
    </Stack.Navigator>
  );
}

export default AppStack;
