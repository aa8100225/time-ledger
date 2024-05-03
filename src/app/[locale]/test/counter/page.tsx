"use client";

import {
  useCreateCounterMutation,
  useLazyGetBadRequestQuery,
  useLazyGetRandomNumberQuery,
  useLazyGetTimeoutQuery,
  useLazyGetUnauthorizedQuery,
} from "@/redux/api/testService";
import {
  decrement,
  increment,
  setValue,
} from "@/redux/features/counter/counterSlice";
import { RootState } from "@/redux/store";
import { rtkQueryErrorMessage } from "@/helper/rtkQueryHelper";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastType, showToast } from "@/helper/toastHelper";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/common/LocaleSwitcher";

export default function Page() {
  const t = useTranslations("Test");
  const [trigger, { data, isLoading, error }] = useLazyGetRandomNumberQuery();
  const [
    triggerUnauthorized,
    { data: unauthorizedData, error: unauthorizedError },
  ] = useLazyGetUnauthorizedQuery();
  const [triggerBadRequest, { data: badRequestData, error: badRequestError }] =
    useLazyGetBadRequestQuery();
  const [createCounter, { data: postData, error: postError }] =
    useCreateCounterMutation();
  const [triggerTimeout, { data: timeoutData, error: timeoutError }] =
    useLazyGetTimeoutQuery();
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setValue(data.randomNumber));
    }
  }, [data, dispatch]);

  const handleFetchCounter = () => trigger();
  const handleUnauthorized = () => triggerUnauthorized();
  const handleBadRequest = () => triggerBadRequest();
  const handleCreateCounter = () => createCounter({ randomNumber: count });
  const handleTimeout = () => triggerTimeout();

  const handleShowSuccess = () =>
    showToast(ToastType.Success, "This is a success message!");
  const handleShowError = () =>
    showToast(ToastType.Error, "This is an error message!");
  const handleShowInfo = () =>
    showToast(ToastType.Info, "This is an info message!");
  const handleShowWarning = () =>
    showToast(ToastType.Warning, "This is a warning message!");

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const errorMessage =
      "status" in error ? (error.data as string) : "An error occurred";
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-xl font-bold mb-4">Counter Page</h1>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p>Current Count: {count}</p>
            <p>{t("title")} </p>
            <LocaleSwitcher></LocaleSwitcher>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleFetchCounter}
            >
              Fetch Counter {data?.randomNumber ?? "undefined"}
            </button>
          </div>
          <div className="flex flex-wrap justify-between gap-4">
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded"
              onClick={handleUnauthorized}
            >
              Trigger 401 Error
            </button>
            <p>
              {rtkQueryErrorMessage(unauthorizedError) ||
                unauthorizedData?.randomNumber}
            </p>
          </div>
          <div className="flex flex-wrap justify-between gap-4">
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded"
              onClick={handleBadRequest}
            >
              Trigger Bad Request
            </button>
            <p>
              {rtkQueryErrorMessage(badRequestError) ||
                badRequestData?.randomNumber}
            </p>
          </div>
          <div className="flex flex-wrap justify-between gap-4">
            <button
              className="px-4 py-2 bg-purple-500 text-white rounded"
              onClick={handleCreateCounter}
            >
              Create Counter
            </button>
            <p>{rtkQueryErrorMessage(postError) || postData?.randomNumber}</p>
          </div>
          <div className="flex flex-wrap justify-between gap-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded"
              onClick={handleTimeout}
            >
              Simulate Timeout
            </button>
            <p>
              {rtkQueryErrorMessage(timeoutError) || timeoutData?.randomNumber}
            </p>
          </div>
          <div className="flex flex-wrap justify-between gap-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded"
              onClick={handleShowSuccess}
            >
              Show Success Toast
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleShowError}
            >
              Show Error Toast
            </button>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded"
              onClick={handleShowInfo}
            >
              Show Info Toast
            </button>
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded"
              onClick={handleShowWarning}
            >
              Show Warning Toast
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-between gap-4">
          <Link
            href="/test/auth"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Go to Auth
          </Link>
        </div>
      </div>
    </div>
  );
}
