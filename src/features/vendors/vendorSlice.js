import { createSlice } from "@reduxjs/toolkit";

const vendorSlice = createSlice({
  name: "vendors",
  initialState: { selectedVendors: [] },
  reducers: {
    toggleVendorSelection: (state, { payload }) => {
      if (state.selectedVendors.includes(payload))
        state.selectedVendors = state.selectedVendors.filter(v => v !== payload);
      else state.selectedVendors.push(payload);
    },
  },
});

export const { toggleVendorSelection } = vendorSlice.actions;
export default vendorSlice.reducer;
