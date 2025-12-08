import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { authApi } from "../features/auth/authApi";
import { vendorApi } from "../features/vendors/vendorApi";
import { rfpApi } from "../features/rfps/rfpApi";
import { proposalApi } from "../features/proposals/proposalApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) =>
    getDefault().concat(
      authApi.middleware,
      vendorApi.middleware,
      rfpApi.middleware,
      proposalApi.middleware
    ),
});

export default store;
