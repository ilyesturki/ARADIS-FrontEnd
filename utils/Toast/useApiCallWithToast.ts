import { useState, useCallback } from "react";
import toast from "react-hot-toast";

type UseApiCallWithToastProps<T> = {
  apiCallFunction: () => Promise<T>;
  handleSuccess: (result: T) => void;
  messages: {
    loading?: string;
    success?: string;
    error?: string;
  };
};

export const useApiCallWithToast = <T>({
  apiCallFunction,
  handleSuccess,
  messages,
}: UseApiCallWithToastProps<T>) => {
  const [isLoading, setIsLoading] = useState(false);

  const executeApiCall = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await toast.promise(apiCallFunction(), {
        loading: messages.loading || "Loading...",
        success: messages.success || "Action completed successfully!",
        error: messages.error || "Could not complete action.",
      });
      handleSuccess(result);
    } finally {
      setIsLoading(false);
    }
  }, [apiCallFunction, handleSuccess, messages]);

  return [isLoading, executeApiCall] as const;
};
