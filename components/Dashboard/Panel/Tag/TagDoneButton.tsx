"use client";

import axios from "@/utils/axios";
import { useApiCallWithToast } from "@/utils/Toast/useApiCallWithToast";
import { useRouter } from "@/i18n/navigation";

const TagDoneButton = ({ id }: { id: string }) => {
  const router = useRouter();

  const [isLoading, markAsDone] = useApiCallWithToast({
    apiCallFunction: () => {
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/tag/validation/${id}`
      );
    },
    handleSuccess: async () => {
      router.refresh();
    },
    messages: {
      loading: "Marking tag as done...", // Localize loading message
      success: "Tag marked as done successfully!", // Localize success message
      error: "Failed to mark tag as done.", // Localize error message
    },
  });

  return (
    <div className="w-full px-4 py-3 flex justify-between items-center bg-redAccent-900 bg-opacity-10 shadow-[0px_0px_2px] shadow-redAccent-900  rounded-md">
      <h2 className="text-center text-sm font-bold text-redAccent-900">
        Confirm completion
      </h2>

      <button
        disabled={isLoading}
        onClick={markAsDone}
        className=" py-1 px-4 bg-redAccent-900 rounded-md text-sm font-medium text-white shadow-sm shadow-grayscale-300"
      >
        Done
      </button>
    </div>
  );
};

export default TagDoneButton;
