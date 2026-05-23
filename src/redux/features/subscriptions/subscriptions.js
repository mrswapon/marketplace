// src/redux/features/subscriptions/subscriptions.js

import { baseApi } from "../../baseApi/baseApi";

const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET SUBSCRIPTIONS
    getSubscriptions: builder.query({
      query: () => ({
        url: "/admin/subscriptions",
        method: "GET",
      }),

      transformResponse: (response) => response?.data,

      providesTags: ["subscriptions"],
    }),

    // ADD SUBSCRIPTION
    addSubscription: builder.mutation({
  query: (data) => ({
    url: "/admin/subscriptions",
    method: "POST",
    body: data,
  }),
  invalidatesTags: ["subscriptions"],
}),
  }),
});

export const {
  useGetSubscriptionsQuery,
  useAddSubscriptionMutation,
} = subscriptionsApi;