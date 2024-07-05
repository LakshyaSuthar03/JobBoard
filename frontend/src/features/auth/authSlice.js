import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isAuthenticated: false,
  username: null,
  userType: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state,action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.userType = action.payload.userType;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null
      state.userType = null
    },

  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
