/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {Fragment, useEffect} from 'react';
import {ActivityIndicator, Image} from 'react-native';

// ** Utils
import {navigateTo} from '../../navigation/utils';
import {theme as Apptheme} from '../../@core/infrustructure/theme';

// ** Third Party Packages
import AsyncStorage from '@react-native-async-storage/async-storage';

// ** Custom Components
import {ImageWrapper, SplashLayout} from '../../styles/screens';
import {appImages} from '../../assets';

// ** SVGs

const Splash = () => {
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('token');
        const initialRouteName = isLoggedIn ? 'App' : 'Auth';
        // const initialRouteName = isLoggedIn ? 'Auth' : 'App';
        navigateTo(initialRouteName);
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Fragment>
      <SplashLayout>
        <ImageWrapper>
          <Image
            source={appImages?.Logo}
            style={{
              width: Apptheme?.WP(30),
              height: Apptheme?.WP(30),
              borderRadius: Apptheme?.WP(2),
              marginBottom: Apptheme?.WP(2),
            }}
          />
          <ActivityIndicator color={'white'} size={'large'} />
        </ImageWrapper>
      </SplashLayout>
    </Fragment>
  );
};

export {Splash};
