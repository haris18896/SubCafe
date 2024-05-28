// RestaurantSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
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

export const searchRestaurants = createAsyncThunk(
  'restaurants/searchRestaurants',
  async ({search, data}) => {
    if (!search) {
      return data;
    }
    return data.filter(
      restaurant =>
        restaurant.businessType.includes(search) ||
        restaurant.businessName.includes(search) ||
        restaurant.email.includes(search) ||
        restaurant.city.includes(search),
    );
  },
);

const initialState = {
  restaurants: [],
  filteredRestaurants: [],
  menu: [],
  restaurant: {
    id: null,
    image: null,
    title: null,
    genre: null,
    short_description: null,
    address: null,
    seats: null,
    type: null,
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
      })
      .addCase(searchRestaurants.fulfilled, (state, action) => {
        state.filteredRestaurants = action.payload;
      });
  },
});

export const {setRestaurant} = RestaurantSlice.actions;

export const selectRestaurant = state => state.restaurants.restaurant;
export const selectFilteredRestaurants = state =>
  state.restaurants.filteredRestaurants;

export default RestaurantSlice.reducer;
