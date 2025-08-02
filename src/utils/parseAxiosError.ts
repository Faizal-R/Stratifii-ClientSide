// src/utils/parseAxiosError.ts
import { AxiosError, isAxiosError } from "axios";

export const parseAxiosError = (
  error: AxiosError | Error | unknown,
  defaultMessage: string
) => {
  if (isAxiosError(error)) {
    return {
      success: false,
      status: error.response?.status,
      error: error.response?.data?.message || defaultMessage,
    };
  }

  return {
    success: false,
    error: "Unexpected error occurred",
  };
};
