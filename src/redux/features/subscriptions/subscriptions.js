import { baseApi } from "../../baseApi/baseApi";

const Subscriptions = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: () => ({
        url: "/admin/subscriptions",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
    }),
  }),
});

export const {
  useGetSubscriptionsQuery
  
} = Subscriptions;
