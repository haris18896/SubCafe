// OrdersSlice.js
import {createSlice} from '@reduxjs/toolkit';
import useJwt from '../../@core/auth/useJwt';
import {createAction} from '../createAction';

// ** Function: Actions
export const createOrderAction = createAction(
  'Create Index',
  useJwt.createOrder,
);

export const getOrderAction = createAction('Get Orders', useJwt.getOrder);
export const getOrderOfOneRestaurantAction = createAction(
  'Get Index Of One Restaurant',
  useJwt.getOrderOfOneRestaurant,
);

export const TableBookingAction = createAction(
  'Table Booking',
  useJwt.tableBooking,
);

const initialState = {
  orders: [],
  restaurantOrders: [],
};

// ** Function: Reducer
const OrdersSlice = createSlice({
  name: 'Orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // ** STATES: Orders
      .addCase(getOrderAction.fulfilled, (state, action) => {
        state.orders = action.payload?.orders;
      })
      .addCase(getOrderOfOneRestaurantAction.fulfilled, (state, action) => {
        state.restaurantOrders = action.payload;
      });
  },
});

export const selectOrders = state => state?.orders?.orders;
export default OrdersSlice.reducer;
