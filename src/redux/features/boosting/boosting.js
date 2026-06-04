import { baseApi } from "../../baseApi/baseApi";

const boostingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL BOOSTING
    getBoosting: builder.query({
      query: () => ({
        url: "/admin/boost-plans",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["Boosting"],
    }),

    // GET BOOSTING STATS
    getBoostingStats: builder.query({
      query: () => ({
        url: "/admin/Boosting/stats",
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["Boosting"],
    }),

    // GET SINGLE BOOSTING
    getSingleBoosting: builder.query({
      query: (id) => ({
        url: `/admin/Boosting/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data,
      providesTags: ["Boosting"],
    }),

    // ADD BOOSTING
    addBoosting: builder.mutation({
      query: (data) => ({
        url: "/admin/Boosting",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Boosting"],
    }),

    // UPDATE BOOSTING
    updateBoosting: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/Boosting/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Boosting"],
    }),

    // DELETE BOOSTING
    deleteBoosting: builder.mutation({
      query: (id) => ({
        url: `/admin/Boosting/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Boosting"],
    }),
  }),
});

export const {
  useGetBoostingQuery,
  useGetBoostingStatsQuery,
  useGetSingleBoostingQuery,
  useAddBoostingMutation,
  useUpdateBoostingMutation,
  useDeleteBoostingMutation,
} = boostingApi;