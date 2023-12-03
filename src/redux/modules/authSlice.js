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
      state.avatar = action.payload.avatar;
      console.log(action.payload.avatar);
      state.userId = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.nickname = action.payload.nickname;
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
    editProfiles: (state, action) => {
      state.avatar = action.payload.avatar;
      state.nickname = action.payload.nickname;
      localStorage.setItem('avatar', action.payload.avatar);
      localStorage.setItem('nickname', action.payload.nickname);
      console.log('editProfiles', action.payload);
    },
  },
});

export default authSlice.reducer;
export const { login, logout, editProfiles } = authSlice.actions;
