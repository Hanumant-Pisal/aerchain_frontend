import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: { token: token || null, user: null },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
      localStorage.setItem("token", payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
