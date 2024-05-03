import { apiService } from "./base";

interface ICounterVo {
  randomNumber: number;
}
const testApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getRandomNumber: builder.query<ICounterVo, void>({
      query: () => "/api/counter",
      transformResponse: (response: ICounterVo) => {
        console.log(response);
        return response;
      },
    }),
    getUnauthorized: builder.query<ICounterVo, void>({
      query: () => "/api/counter?type=401",
      transformResponse: (response: ICounterVo) => {
        console.log("Unauthorized response received:", response);
        return response;
      },
    }),
    getBadRequest: builder.query<ICounterVo, void>({
      query: () => "/api/counter?type=error",
      transformResponse: (response: ICounterVo) => {
        console.log("Bad request response received:", response);
        return response;
      },
    }),

    getTimeout: builder.query<ICounterVo, void>({
      query: () => "/api/counter?type=timeout",
      transformResponse: (response: ICounterVo) => {
        console.log("Timeout simulation response:", response);
        return response;
      },
    }),

    createCounter: builder.mutation<ICounterVo, Partial<ICounterVo>>({
      query: (body) => ({
        url: "/api/counter",
        method: "POST",
        body,
      }),
      transformResponse: (response: ICounterVo) => {
        console.log("POST response:", response);
        return response;
      },
    }),
  }),
  overrideExisting: false,
});
export const {
  useGetRandomNumberQuery,
  useLazyGetRandomNumberQuery,
  useLazyGetTimeoutQuery,
  useLazyGetUnauthorizedQuery,
  useLazyGetBadRequestQuery,
  useCreateCounterMutation,
} = testApi;
export default testApi;
