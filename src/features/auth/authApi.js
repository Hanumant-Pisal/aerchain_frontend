import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({ url: "/login", method: "POST", body: data }),
    }),
    register: builder.mutation({
      query: (data) => ({ url: "/register", method: "POST", body: data }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
