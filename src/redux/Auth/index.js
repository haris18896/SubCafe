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
const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {},
    userMe: {},
    avatar: null,
  },
  reducers: {
    Logout: state => {
      return {
        ...state,
        login: {},
        userMe: {},
        isLoading: false,
      };
    },
    UserProfileAction: (state, action) => {
      return {
        ...state,
        avatar: action.payload,
      };
    },
  },
  extraReducers: builder => {
    builder
      // ** STATES: LoginAction
      .addCase(LoginAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.login = action.payload;
      })

      // ** STATES: UserMeAction
      .addCase(UserMeAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userMe = action.payload;
      });
  },
});

export const {Logout, UserProfileAction} = AuthSlice.actions;
export default AuthSlice.reducer;
