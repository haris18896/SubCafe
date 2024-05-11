import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ** Screens
import {MyDrawer} from '../drawer/DrawerNavigation';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName={'MyDrawer'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'MyDrawer'} component={MyDrawer} />
    </Stack.Navigator>
  );
}

export default AppStack;
