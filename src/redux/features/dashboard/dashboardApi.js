import { baseApi } from "../../baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatus: builder.query({
      query: () => ({
        url: "/admin/getTotalStatus",
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    getIncomeRatio: builder.query({
      query: (date) => ({
        url: `/admin/dashboard/summary?timespan=${date}`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    
    getRecentActvities: builder.query({
    query: ({ page, limit}) => ({
      url: `/admin/activities?page=${page}&limit=${limit}`,
      method: "GET",
    }),
    transformResponse: (response) => response,
   }),
  }),
});

export const { useGetDashboardStatusQuery, useGetIncomeRatioQuery, useGetRecentActvitiesQuery } = dashboardApi;
