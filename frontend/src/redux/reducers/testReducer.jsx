import { createSlice } from '@reduxjs/toolkit';
import { handleAsyncThunk } from '../helper';
import {  getTestReportAction, submitTestAction } from '../action/testAction';

const initialState = {
  report: [],
}

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    handleAsyncThunk(builder, getTestReportAction, 'report');
    handleAsyncThunk(builder, submitTestAction, );
  },
});

export default testSlice.reducer;
