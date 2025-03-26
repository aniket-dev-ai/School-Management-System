import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/admin/" }),
  endpoints: (builder) => ({
    registerAdmin: builder.mutation({
      query: (adminData) => ({
        url: "register",
        method: "POST",
        body: adminData,
      }),
    }),
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    getAdmin: builder.query({
      query: (token) => ({
        url: "getadmin",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
    }),
  }),
});

export const { useRegisterAdminMutation, useLoginAdminMutation, useGetAdminQuery } = authApi;
