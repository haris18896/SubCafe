// AuthSlice.js
import {createSlice} from '@reduxjs/toolkit';
import useJwt from '../../@core/auth/useJwt';
import {createAction} from '../createAction';

// ** Function: Actions
export const LoginAction = createAction('Login', useJwt.login);

export const RegisterAction = createAction('Register Account', useJwt.register);
export const DeleteAction = createAction(
  'Delete Account',
  useJwt.deleteAccount,
);

export const UpdateAction = createAction(
  'Update Account',
  useJwt.updateAccount,
);
export const UpdateUserImageAction = createAction(
  'Update Image',
  useJwt.updateUserImage,
);

// ** Function: Reducer
const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    login: {},
    avatar: null,
  },
  reducers: {
    Logout: state => {
      return {
        ...state,
        login: {},
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
      });
  },
});

export const {Logout, UserProfileAction} = AuthSlice.actions;
export default AuthSlice.reducer;
