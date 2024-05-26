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
  restaurant: {
    id: null,
    imgUrl: null,
    rating: null,
    title: null,
    genre: null,
    address: null,
    short_description: null,
    dishes: null,
    long: null,
    lat: null,
    seats: null,
  },
};

// ** Function: Reducer
const RestaurantSlice = createSlice({
  name: 'Restaurants',
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
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

export const {setRestaurant} = RestaurantSlice.actions;

export const selectRestaurant = state => state.restaurant.restaurant;

export default RestaurantSlice.reducer;
