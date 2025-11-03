import { createSlice } from '@reduxjs/toolkit';
import { handleAsyncThunk } from '../helper';
import { getLearningContentAction } from '../action/learningAction';

const initialState = {
  learningContent: [],
}

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    handleAsyncThunk(builder, getLearningContentAction, 'learningContent');
  },
});

export default learningSlice.reducer;
