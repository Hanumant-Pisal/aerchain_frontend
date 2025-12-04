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
    getVendorProposals: builder.query({
      query: () => "/vendor",
    }),
    getBuyerProposals: builder.query({
      query: () => "/buyer",
    }),
    compareRfpProposals: builder.query({
      query: (rfpId) => `/compare/${rfpId}`,
    }),
    submitProposal: builder.mutation({
      query: (data) => ({
        url: "/submit",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCompareProposalsQuery, useGetVendorProposalsQuery, useGetBuyerProposalsQuery, useCompareRfpProposalsQuery, useSubmitProposalMutation } = proposalApi;
