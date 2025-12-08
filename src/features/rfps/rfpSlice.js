import { createSlice } from "@reduxjs/toolkit";

const rfpSlice = createSlice({
  name: "rfps",
  initialState: { selectedRfp: null },
  reducers: {
    setSelectedRfp: (state, { payload }) => {
      state.selectedRfp = payload;
    },
  },
});

export const { setSelectedRfp } = rfpSlice.actions;
export default rfpSlice.reducer;
