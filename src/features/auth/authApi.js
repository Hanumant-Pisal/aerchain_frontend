import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { showSuccess, showError, showInfo } from "../../utils/toast";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Buyer'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({ url: "/login", method: "POST", body: data }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          showSuccess("Login successful!");
        } catch (error) {
          showError(error.error?.data?.message || "Login failed");
        }
      },
    }),
    register: builder.mutation({
      query: (data) => ({ url: "/register", method: "POST", body: data }),
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showSuccess("Registration successful! Please login.");
        } catch (error) {
          showError(error.error?.data?.message || "Registration failed");
        }
      },
    }),
    getBuyers: builder.query({
      query: () => "/buyers",
      providesTags: ['Buyer']
    }),
    deleteBuyer: builder.mutation({
      query: (id) => ({ url: `/buyers/${id}`, method: "DELETE" }),
      invalidatesTags: ['Buyer'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled;
          showSuccess("Buyer deleted successfully!");
        } catch (error) {
          showError(error.error?.data?.message || "Failed to delete buyer");
        }
      },
    }),
    getSystemHealth: builder.query({
      query: () => "/health",
      providesTags: ['SystemHealth']
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetBuyersQuery, useDeleteBuyerMutation, useGetSystemHealthQuery } = authApi;
