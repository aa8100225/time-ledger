import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export const rtkQueryErrorMessage = (error: any) => {
  if (
    typeof error === "object" &&
    error != null &&
    "name" in error &&
    error.name === "AbortError"
  ) {
    return "The operation was aborted. This may be caused by a timeout.";
  }
  if (isFetchBaseQueryError(error)) {
    const errMsg = "error" in error ? error.error : JSON.stringify(error.data);
    return errMsg;
  }
  if (isErrorWithMessage(error)) {
    return error.message;
  }
  return "unknown error !!!!!!!!";
};
