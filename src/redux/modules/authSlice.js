import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  userId: localStorage.getItem('userId'),
  isLogin: !!localStorage.getItem('accessToken'),
  avatar: localStorage.getItem('avatar'),
  nickname: localStorage.getItem('nickname'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('userId', action.payload.userId);
      localStorage.setItem('avatar', action.payload.avatar);
      localStorage.setItem('nickname', action.payload.nickname);
    },
    logout: (state, action) => {
      window.localStorage.clear();
      state.isLogin = false;
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
