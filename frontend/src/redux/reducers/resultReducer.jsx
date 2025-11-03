import { createSlice } from '@reduxjs/toolkit';
import { handleAsyncThunk } from '../helper';
import { getResultAction } from '../action/resultAction';

const initialState = {
  results: [],
}

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    handleAsyncThunk(builder, getResultAction, 'results');
  },
});

export default resultSlice.reducer;
