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
  }),
});

export const { useCreateRfpMutation, useGetRfpsQuery } = rfpApi;
