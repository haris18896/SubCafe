import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// ** Screens
import {Login, Register, ResetPassword, ForgotPassword} from '../../screens';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Login'}>
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'SignUp'} component={Register} />
      <Stack.Screen name={'ForgotPassword'} component={ForgotPassword} />
      <Stack.Screen name={'ResetPassword'} component={ResetPassword} />
    </Stack.Navigator>
  );
};
export {AuthStack};
