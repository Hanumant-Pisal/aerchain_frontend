import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  try {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return {
      token: token || null,
      user: user ? JSON.parse(user) : null
    };
  } catch (error) {
    console.warn("Failed to parse user from localStorage:", error);
    return { token: null, user: null };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
      try {
        localStorage.setItem("token", payload.token);
        localStorage.setItem("user", JSON.stringify(payload.user));
      } catch (error) {
        console.warn("Failed to save credentials to localStorage:", error);
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch (error) {
        console.warn("Failed to remove credentials from localStorage:", error);
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
