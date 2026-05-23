import { baseApi } from "../../baseApi/baseApi";

const Subscriptions = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptions: builder.query({
      query: () => ({
        url: `/admin/settings/{{setting_id}}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.attributes,
    }),
  }),
});

export const {
  useGetSubscriptionsQuery
  
} = Subscriptions;
