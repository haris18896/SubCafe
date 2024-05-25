// RestaurantSlice.js
import {createSlice} from '@reduxjs/toolkit';
import useJwt from '../../@core/auth/useJwt';
import {createAction} from '../createAction';

// ** Function: Actions
export const getRestaurantsAction = createAction(
  'Get Restaurants',
  useJwt.getRestaurants,
);

export const getRestaurantMenuAction = createAction(
  'Get Restaurants Menu',
  useJwt.getRestaurantMenu,
);

const initialState = {
  restaurants: [],
  menu: [],
};

// ** Function: Reducer
const RestaurantSlice = createSlice({
  name: 'Restaurants',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ** STATES: Restaurants and Restaurant Menu
      .addCase(getRestaurantsAction.fulfilled, (state, action) => {
        state.restaurants = action.payload;
      })
      .addCase(getRestaurantMenuAction.fulfilled, (state, action) => {
        state.menu = action.payload;
      });
  },
});

export default RestaurantSlice.reducer;
