import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { setValue } from "../features/counter/counterSlice";
import { ToastType, showToast } from "@/helper/toastHelper";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  timeout: 3000,
  prepareHeaders: (headers) => {
    return headers;
  },
  credentials: "include",
});

interface EnhancedError {
  status: number;
  data: string;
}

function handleEnhancedError(error: any): EnhancedError {
  if (error.status && typeof error.status === "number") {
    console.log("error.data?.message ", error.data?.message);
    return {
      status: error.status,
      data: error.data?.message || "An error occurred",
    };
  }
  return {
    status: 500,
    data: error.data?.error || "An unknown error occurred",
  };
}

const enhancedBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      console.log("Result ", result.error);
      throw {
        status: result.error.status,
        data: result.error.data || result.error,
      };
    }
    return result;
  } catch (error: unknown) {
    const { status, data } = handleEnhancedError(error);
    if (status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      api.dispatch(setValue(401));
    }
    console.log("last ", data);
    showToast(ToastType.Error, data);
    return {
      error: { status, data },
      data: undefined,
    };
  }
};

export const apiService = createApi({
  baseQuery: enhancedBaseQuery,
  reducerPath: "apiService",
  keepUnusedDataFor: 5 * 60,
  refetchOnMountOrArgChange: 30 * 60,
  endpoints: () => ({}),
});
