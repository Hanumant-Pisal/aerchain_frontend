import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { showSuccess, showError } from "../../utils/toast";

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
  tagTypes: ['Proposal'],
  endpoints: (builder) => ({
    compareProposals: builder.query({
      query: (id) => `/compare/${id}`,
    }),
    getVendorProposals: builder.query({
      query: () => "/vendor",
      providesTags: ['Proposal']
    }),
    getBuyerProposals: builder.query({
      query: () => "/buyer",
      providesTags: ['Proposal']
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
      invalidatesTags: ['Proposal'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showSuccess("Proposal submitted successfully! You will receive a confirmation email.");
        } catch (error) {
          showError(error.error?.data?.message || "Failed to submit proposal");
        }
      },
    }),
  }),
});

export const { useCompareProposalsQuery, useGetVendorProposalsQuery, useGetBuyerProposalsQuery, useCompareRfpProposalsQuery, useSubmitProposalMutation } = proposalApi;
