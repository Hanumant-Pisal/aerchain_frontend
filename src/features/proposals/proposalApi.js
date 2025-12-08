import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { showSuccess, showError } from "../../utils/toast";

const baseQuery = fetchBaseQuery({ 
  baseUrl: "/api/proposals",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});
const baseQueryWithRetry = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  
  if (result.error && result.error.status >= 500) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    result = await baseQuery(args, api, extraOptions);
  }
  
  return result;
};

export const proposalApi = createApi({
  reducerPath: "proposalApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Proposal', 'RFP'],
  keepUnusedDataFor: 300, 
  endpoints: (builder) => ({
    getVendorProposals: builder.query({
      query: () => "/vendor",
      providesTags: ['Proposal'],
      keepUnusedDataFor: 180 
    }),
    getBuyerProposals: builder.query({
      query: () => "/buyer",
      providesTags: ['Proposal'],
      keepUnusedDataFor: 180 
    }),
    compareRfpProposals: builder.query({
      query: (rfpId) => `/compare/${rfpId}`,
      providesTags: ['Proposal', 'RFP'],
      keepUnusedDataFor: 600 
    }),
    submitProposal: builder.mutation({
      query: (data) => ({
        url: "/submit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Proposal'],
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          await queryFulfilled;
          showSuccess("Proposal submitted successfully! You will receive a confirmation email.");
          
          dispatch(proposalApi.util.invalidateTags(['Proposal']));
        } catch (error) {
          showError(error.error?.data?.message || "Failed to submit proposal");
        }
      },
    }),
  }),
});

export const { useGetVendorProposalsQuery, useGetBuyerProposalsQuery, useCompareRfpProposalsQuery, useSubmitProposalMutation } = proposalApi;
