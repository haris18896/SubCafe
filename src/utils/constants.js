import React from 'react';
import {showToast} from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const MAIN_URL = 'http://13.49.231.32:8000';
export const MAIN_URL = 'https://75c4-139-135-60-10.ngrok-free.app';

// ** Utils
import {theme as AppTheme} from '../@core/infrustructure/theme';

// ** SVGs
import Home from '../assets/svgs/home.svg';
import User from '../assets/svgs/user.svg';
import Basket from '../assets/svgs/basket.svg';
import BasketActive from '../assets/svgs/basketActive.svg';
import UserActive from '../assets/svgs/user.svg';
import HomeActive from '../assets/svgs/homeActive.svg';

export const resizeMode = 'cover';
export const AppBottomTab = [
  {
    id: 0,
    title: 'Home',
    screen: 'Dashboard',
    icon: <Home width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />,
    iconActive: <HomeActive width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />,
    list: ['Dashboard'],
  },
  {
    id: 1,
    title: 'Cart',
    screen: 'Basket',
    icon: <Basket width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />,
    iconActive: (
      <BasketActive width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />
    ),
    list: ['Basket'],
  },
  {
    id: 2,
    title: 'Profile',
    screen: 'Profile',
    icon: <User width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />,
    iconActive: <UserActive width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />,
    list: ['Profile'],
  },
];

// ** DONE: Async Storage items has been set
export const getData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    showToast({
      title: 'Fetch token',
      message: 'Failed to fetch token',
      type: 'error',
    });
  }
};

export const setData = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    showToast({
      title: 'Set token',
      message: 'Failed to set token',
      type: 'error',
    });
  }
};

export const removeData = async key => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    showToast({
      title: 'Remove token',
      message: 'Failed to remove token',
      type: 'error',
    });
  }
};

export const getAllData = async () => {
  let keys = [];
  try {
    keys = await AsyncStorage.getAllKeys();
  } catch (e) {
    showToast({
      title: 'Get all data',
      message: 'Failed to get all data',
      type: 'error',
    });
  }

  return keys;
};

export const clearAllData = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (e) {
    showToast({
      title: 'Clear all data',
      message: 'Failed to clear all data',
      type: 'error',
    });
  }
};
