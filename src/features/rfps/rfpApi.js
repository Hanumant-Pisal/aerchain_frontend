import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rfpApi = createApi({
  reducerPath: "rfpApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "/api/rfps",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createRfp: builder.mutation({
      query: (data) => ({ url: "/create", method: "POST", body: data }),
    }),
    getRfps: builder.query({ query: () => "/" }),
    getRfp: builder.query({ query: (id) => `/${id}` }),
    getVendorRfps: builder.query({ query: () => "/vendor" }),
    sendRfp: builder.mutation({
      query: (data) => ({ url: "/send", method: "POST", body: data }),
    }),
  }),
});

export const { useCreateRfpMutation, useGetRfpsQuery, useGetRfpQuery, useGetVendorRfpsQuery, useSendRfpMutation } = rfpApi;
