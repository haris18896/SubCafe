import React from 'react';
import {showToast} from './utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SALUS_ID_PROD = '5504';
// export const SALUS_ID_PROD = '12534'; // ** Staging

export const NODE_URL =
  'https://n9nujiqsyd.execute-api.us-east-1.amazonaws.com/dev/';

// export const NODE_URL = 'http://localhost:3002';

export const STRIPE_KEY = 'pk_live_WzFpsrfurxhcz0HJspt9nbnn'; // Production
// export const STRIPE_KEY = 'pk_test_fAj7WlTrG0uc5Z9WHKQDdoTq'; // Development

// ** Utils
import {theme as AppTheme} from '../@core/infrustructure/theme';

// ** SVGs
import Mail from '../assets/svgs/Mail.svg';
import Home from '../assets/svgs/home.svg';
import Calendar from '../assets/svgs/calendar.svg';
import HomeActive from '../assets/svgs/homeActive.svg';
import CalendarActive from '../assets/svgs/calendarActive.svg';
import Community from '../assets/svgs/community.svg';
import CommunityActive from '../assets/svgs/community_active.svg';
import Chat from '../assets/svgs/chatGray.svg';
import ChatActive from '../assets/svgs/chatActive.svg';

export const resizeMode = 'cover';
export const AppBottomTab = [
  {
    id: 0,
    title: 'Home',
    screen: 'Dashboard',
    icon: <Home width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />,
    iconActive: <HomeActive width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />,
    list: ['MyDrawer', 'Dashboard'],
  },
  {
    id: 1,
    title: 'Sessions',
    screen: 'SessionsStack',
    icon: <Calendar width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />,
    iconActive: (
      <CalendarActive width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />
    ),
    list: [
      'SessionsStack',
      'MySessions',
      'PastSessions',
      'GroupSession',
      'ScheduleSession',
      'OneToOneSession',
      'AvailableSessions',
      'PreviewSession',
    ],
  },
  {
    id: 3,
    title: 'Chat',
    screen: 'ChatStack',
    icon: <Chat width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />,
    iconActive: <ChatActive width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />,
    list: ['ChatStack', 'ChatHub', 'UserDirectory'],
  },
  {
    id: 3,
    title: 'Community',
    screen: 'Community',
    icon: <Community width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />,
    iconActive: (
      <CommunityActive width={AppTheme?.WP(6)} height={AppTheme?.WP(7)} />
    ),
    list: ['Community'],
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
