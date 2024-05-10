// AuthSlice.js
import {createSlice} from '@reduxjs/toolkit';
import useJwt from '../../@core/auth/useJwt';
import {createAction} from '../createAction';

// ** Function: Actions
export const LoginAction = createAction('Login', useJwt.login(data));

export const register = createAction('DeleteAccount', useJwt.register(data));

export const UserMeAction = createAction('UserMe', useJwt.UserMe);

export const DeleteAccountAction = createAction(
  'DeleteAccount',
  useJwt.deleteAccount,
);

// ** Function: Reducer
const SettingsSlice = createSlice({
  name: 'settings',
  initialState: {
    theme: 'light',
  },
  reducers: {
    ToggleTheme: async (state, action) => {
      await useJwt.setData(action.payload);
      return {
        ...state,
        theme: action.payload === 'dark' ? 'light' : 'dark',
      };
    },
  },
});

export const {ToggleTheme} = SettingsSlice.actions;

export default SettingsSlice.reducer;
