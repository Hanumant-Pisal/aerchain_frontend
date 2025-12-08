import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { showSuccess, showError, showWarning, showInfo } from "../../utils/toast";

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
  tagTypes: ['RFP'],
  endpoints: (builder) => ({
    createRfp: builder.mutation({
      query: (data) => ({ url: "/create", method: "POST", body: data }),
      invalidatesTags: ['RFP'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showSuccess("RFP created successfully!");
        } catch (error) {
          showError(error.error?.data?.message || "Failed to create RFP");
        }
      },
    }),
    getRfps: builder.query({ 
      query: () => "/",
      providesTags: ['RFP']
    }),
    getRfp: builder.query({ 
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'RFP', id }]
    }),
    getVendorRfps: builder.query({ query: () => "/vendor" }),
    updateRfp: builder.mutation({
      query: ({ id, ...data }) => ({ 
        url: `/${id}`, 
        method: "PUT", 
        body: data 
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'RFP', id }, 'RFP'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          const data = result.data;
          
          if (data.warning) {
            showWarning(`${data.message} - ${data.warning}`);
          } else if (data.note) {
            showInfo(`${data.message} - ${data.note}`);
          } else {
            showSuccess(data.message);
          }
        } catch (error) {
          const errorData = error.error?.data;
          if (errorData?.reason && errorData?.suggestion) {
            showError(`${errorData.message}: ${errorData.reason}. ${errorData.suggestion}`);
          } else {
            showError(errorData?.message || "Failed to update RFP");
          }
        }
      },
    }),
    deleteRfp: builder.mutation({
      query: (id) => ({ 
        url: `/${id}`, 
        method: "DELETE" 
      }),
      invalidatesTags: ['RFP'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showSuccess("RFP deleted successfully!");
        } catch (error) {
          const errorData = error.error?.data;
          if (errorData?.reason && errorData?.suggestion) {
            showError(`${errorData.message}: ${errorData.reason}. ${errorData.suggestion}`);
          } else {
            showError(errorData?.message || "Failed to delete RFP");
          }
        }
      },
    }),
    sendRfp: builder.mutation({
      query: (data) => ({ url: "/send", method: "POST", body: data }),
      invalidatesTags: ['RFP'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          const { sent, failed, total } = result.data.emailResults;
          if (failed === 0) {
            showSuccess(`RFP sent successfully to ${sent} vendor${sent > 1 ? 's' : ''}!`);
          } else if (sent > 0) {
            showSuccess(`RFP sent to ${sent} vendor${sent > 1 ? 's' : ''}. ${failed} email${failed > 1 ? 's' : ''} failed.`);
          } else {
            showError("Failed to send RFP emails. Please try again.");
          }
        } catch (error) {
          showError(error.error?.data?.message || "Failed to send RFP");
        }
      },
    }),
  }),
});

export const { 
  useCreateRfpMutation, 
  useGetRfpsQuery, 
  useGetRfpQuery, 
  useGetVendorRfpsQuery, 
  useUpdateRfpMutation,
  useDeleteRfpMutation,
  useSendRfpMutation 
} = rfpApi;
