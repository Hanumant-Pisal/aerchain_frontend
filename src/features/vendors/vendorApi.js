import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "/api/vendors",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVendors: builder.query({ query: () => "/" }),
    addVendor: builder.mutation({
      query: (data) => ({ url: "/add", method: "POST", body: data }),
    }),
  }),
});

export const { useGetVendorsQuery, useAddVendorMutation } = vendorApi;
