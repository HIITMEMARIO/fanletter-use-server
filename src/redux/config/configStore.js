import { configureStore } from '@reduxjs/toolkit';
import list from '../modules/list';
import authSlice from 'redux/modules/authSlice';

const store = configureStore({
  reducer: {
    list: list,
    auth: authSlice,
  },
});

export default store;
