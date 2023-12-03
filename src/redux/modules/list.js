import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// 초기 상태값(state)
const initialState = {
  letter: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getList = createAsyncThunk(
  'GET_LIST',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/letters');
      console.log(response);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log('error:', error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const __addList = createAsyncThunk(
  'ADD_LIST',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/letters',
        payload
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log('error:', error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const __deleteList = createAsyncThunk(
  'DELETE_LIST',
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const response = await axios.delete(
        `http://localhost:5000/letters/${payload}`
      );
      console.log('axios:', response.data);
      thunkAPI.dispatch(__getList());
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log('error:', error);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const __editList = createAsyncThunk(
  'EDIT_LIST',
  async (payload, thunkAPI) => {
    console.log('asf:', payload);
    try {
      const response = await axios.patch(
        `http://localhost:5000/letters/${payload.id}`,
        { content: payload.content }
      );
      console.log(response.data);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log('error:', error);
      return thunkAPI.rejectWithValue();
    }
  }
);

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: {
    // get
    [__getList.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letter = action.payload;
    },
    [__getList.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // add
    [__addList.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__addList.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoading = false;
      state.isError = false;
      state.letter.push(action.payload);
    },
    [__addList.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // delete
    [__deleteList.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__deleteList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
    },
    [__deleteList.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    // edit
    [__editList.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__editList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      const findLetter = state.letter.findIndex((item) => {
        return item.id === action.payload.id;
      });
      state.letter.splice(findLetter, 1, action.payload);
    },
    [__editList.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export default listSlice.reducer;
export const {} = listSlice.actions;
