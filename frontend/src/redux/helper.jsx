// utils/handleAsyncAction.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from '../utils/helper';

export const handleAsyncAction = (actionType, apiFn,apiType) => {
  return createAsyncThunk(
    actionType,
    async (data, { rejectWithValue, dispatch }) => {
      try {
        const response = await apiFn(data, dispatch);
        const { data: responseData, success, error, message } = response || {}
        handleSuccess(dispatch, { success, message, data: responseData, apiType });
        if (success) {
          return { success: true, data: responseData };
        } else {
          console.log(error,'---------')
          handleError(dispatch, { success, message, error: error || !success, apiType });
          return { success: false, data: [], message, error };
        }
      } catch (error) {
          console.log(error,'---------')

        const errorMessage = error?.message || (typeof error === 'string' && error) || 'Something went wrong'
        handleError(
          dispatch,
          {
            success: false,
            message: errorMessage,
            error: true,
            apiType
          },
          errorHandler
        );
        return rejectWithValue(errorMessage);
      }
    }
  );
};

const handleSuccess = (dispatch, { success, message, data, apiType }) => {
  if (apiType !== 'get') {
    dispatch(notification(success, message || '', false));

  }
};

const handleError = (dispatch, { error, message, apiType }, ) => {
  if (apiType !== 'get') {
    dispatch(notification(false, message || 'Something went wrong', true));
  }

};


export const handleAsyncThunk = (builder, thunk, key) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.loading = false;
      state[key] = action.payload?.data;

    })
    .addCase(thunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || action.error.message;
    });
};

