/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {ActivityIndicator, StatusBar} from 'react-native';
import React, {Fragment, useEffect} from 'react';

// ** Utils
import {navigateTo} from '../../navigation/utils';
import {theme as AppTheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import AsyncStorage from '@react-native-async-storage/async-storage';

// ** Custom Components
import {ImageWrapper, SplashLayout} from '../../Styles';

// ** SVGs

const Splash = () => {
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('token');
        const initialRouteName = isLoggedIn ? 'App' : 'Auth';
        navigateTo(initialRouteName);
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Fragment>
      <StatusBar
        backgroundColor={AppTheme?.DefaultPalette()?.success?.main}
        barStyle={'light-content'}
      />
      <SplashLayout>
        <ImageWrapper>
          <ActivityIndicator color={'white'} size={'large'} />
        </ImageWrapper>
      </SplashLayout>
    </Fragment>
  );
};
export {Splash};
