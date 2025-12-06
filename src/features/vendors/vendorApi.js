import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { showSuccess, showError } from "../../utils/toast";

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
  tagTypes: ['Vendor'],
  endpoints: (builder) => ({
    getVendors: builder.query({ 
      query: () => "/",
      providesTags: ['Vendor']
    }),
    addVendor: builder.mutation({
      query: (data) => ({ url: "/add", method: "POST", body: data }),
      invalidatesTags: ['Vendor'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showSuccess("Vendor added successfully!");
        } catch (error) {
          showError(error.error?.data?.message || "Failed to add vendor");
        }
      },
    }),
    deleteVendor: builder.mutation({
      query: (id) => ({ url: `/${id}`, method: "DELETE" }),
      invalidatesTags: ['Vendor'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showSuccess("Vendor deleted successfully!");
        } catch (error) {
          showError(error.error?.data?.message || "Failed to delete vendor");
        }
      },
    }),
  }),
});

export const { useGetVendorsQuery, useAddVendorMutation, useDeleteVendorMutation } = vendorApi;
