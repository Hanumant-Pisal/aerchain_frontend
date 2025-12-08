import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import vendorSlice from "../features/vendors/vendorSlice";
import rfpSlice from "../features/rfps/rfpSlice";
import proposalSlice from "../features/proposals/proposalSlice";
import { authApi } from "../features/auth/authApi";
import { vendorApi } from "../features/vendors/vendorApi";
import { rfpApi } from "../features/rfps/rfpApi";
import { proposalApi } from "../features/proposals/proposalApi";

export default combineReducers({
  auth: authSlice,
  vendors: vendorSlice,
  rfps: rfpSlice,
  proposals: proposalSlice,
  [authApi.reducerPath]: authApi.reducer,
  [vendorApi.reducerPath]: vendorApi.reducer,
  [rfpApi.reducerPath]: rfpApi.reducer,
  [proposalApi.reducerPath]: proposalApi.reducer,
});
