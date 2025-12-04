import { createSlice } from "@reduxjs/toolkit";

const proposalSlice = createSlice({
  name: "proposals",
  initialState: { selectedProposal: null },
  reducers: {
    setProposal: (state, { payload }) => {
      state.selectedProposal = payload;
    },
  },
});

export const { setProposal } = proposalSlice.actions;
export default proposalSlice.reducer;
