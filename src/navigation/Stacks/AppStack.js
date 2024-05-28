import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ** Screens
import {
  Basket,
  Profile,
  Delivery,
  Dashboard,
  Restaurant,
  PreparingOrder,
  Orders,
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
      <Stack.Screen name={'Restaurant'} component={Restaurant} />
      <Stack.Screen name={'Delivery'} component={Delivery} />
      <Stack.Screen name={'Orders'} component={Orders} />
      <Stack.Screen name={'PreparingOrder'} component={PreparingOrder} />
    </Stack.Navigator>
  );
}

export default AppStack;
