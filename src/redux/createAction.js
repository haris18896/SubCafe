import {showToast} from '../utils/utils';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const createAction = (type, apiFunction) => {
  return createAsyncThunk(
    `dashboard/${type}`,
    async (
      {data, callback, refreshing, errorCallback},
      {fulfillWithValue, rejectWithValue},
    ) => {
      try {
        const res = await apiFunction(data);
        const result = res?.data;
        refreshing();

        callback(result);

        return fulfillWithValue(result);
      } catch (err) {
        console.log('check err', err);
        errorCallback(err);
        showToast({
          title: `Error in ${type}`,
          message: err?.response?.message || err?.message,
          type: 'error',
        });
        return rejectWithValue(err);
      }
    },
  );
};
