import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const proposalApi = createApi({
  reducerPath: "proposalApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "/api/proposals",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    compareProposals: builder.query({
      query: (id) => `/compare/${id}`,
    }),
  }),
});

export const { useCompareProposalsQuery } = proposalApi;
