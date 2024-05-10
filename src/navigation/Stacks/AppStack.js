import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ** Screens
import BottomTab from '../bottom-tab';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName={'BottomTab'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'BottomTab'} component={BottomTab} />
    </Stack.Navigator>
  );
}

export default AppStack;
