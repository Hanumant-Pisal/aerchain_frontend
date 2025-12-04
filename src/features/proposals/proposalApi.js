import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const proposalApi = createApi({
  reducerPath: "proposalApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/proposals" }),
  endpoints: (builder) => ({
    compareProposals: builder.query({
      query: (id) => `/compare/${id}`,
    }),
  }),
});

export const { useCompareProposalsQuery } = proposalApi;
