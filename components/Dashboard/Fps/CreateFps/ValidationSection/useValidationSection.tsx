"use client";
import { FpsType, flexibleFpsType } from "@/redux/fps/fpsSlice";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  customHandleForTostSubmit,
  customHandleSubmit,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { fpsValidationValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFpsValidation } from "@/redux/fps/fpsThunk";

import { initialFpsValidation } from "@/data/fps";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useApiCallWithToast } from "@/utils/Toast/useApiCallWithToast";

const useValidationSection = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [fpsData, setFpsData] = useState<flexibleFpsType>(initialFpsValidation);
  const [fpsId, setFpsId] = useState<FpsType["fpsId"]>("");

  const { data: session } = useSession({ required: true });

  const isAdminOrManager = useMemo(
    () =>
      ["corporaite", "top-management"].includes(
        session?.user.userCategory || ""
      ),
    [session?.user.userCategory]
  );
  const [currentStep, setCurrentStep] = useState<string | null>(null);

  const isDone = useMemo(() => {
    return currentStep === "validation";
  }, [currentStep]);

  const isDisabled = useMemo(() => {
    const tabsOrder = [
      "problem",
      "immediateActions",
      "cause",
      "defensiveActions",
      "validation",
    ];

    return currentStep
      ? isAdminOrManager ||
          isDone ||
          !(
            tabsOrder.indexOf(currentStep) >=
            tabsOrder.indexOf("defensiveActions")
          )
      : isAdminOrManager;
  }, [isAdminOrManager, currentStep]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const fpsId = params.get("fpsId");

    if (fpsId) {
      setFpsId(fpsId);
      return;
    }
  }, []);

  const [submitBtnValue] = useState<"Save" | "Update">("Save");

  const [fpsCompleted, setFpsCompleted] = useState<boolean>(false);

  const fps = useAppSelector((state) => state.fpss.fps);

  useEffect(() => {
    if (fps?.status) {
      console.log("fps?.validation");
      console.log(fps);
      console.log("fps?.validation");
      setFpsData({
        status: fps.status,
      });
      setFpsCompleted(fps.status === "completed");
    }
    setCurrentStep(fps?.currentStep || null);
    // setSubmitBtnValue(
    //   ["validation"].includes(fps?.currentStep || "") ? "Update" : "Save"
    // );
  }, [fps]);

  const handleStatusChange = () => {
    console.log("fpsCompleted");
    console.log(fpsCompleted);
    console.log("fpsCompleted");
    setFpsData((prevData) => ({
      ...prevData,
      status: fpsCompleted ? "completed" : "failed",
    }));
    console.log(fpsData);
    setFpsCompleted(!fpsCompleted);
  };

  function validateAndSubmit(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const dataToValidate: Record<string, string> = {
        fpsId: fpsId,
        status: fpsData.status || "",
      };
      console.log(dataToValidate);
      const newErrors = validateFormFields(
        dataToValidate,
        fpsValidationValidationRules
      );
      if (Object.keys(newErrors).length > 0) {
        handleError({ customError: true, errors: newErrors });
        reject(newErrors);
        return;
      }

      customHandleForTostSubmit(
        {},
        {
          fpsId: fpsId,
          status: fpsData.status || "",
        },
        async (formData) => {
          try {
            const result = await dispatch(
              createFpsValidation({ id: fpsId, fps: formData })
            );

            // If using Redux Toolkit and createAsyncThunk
            if (result?.meta?.requestStatus === "rejected") {
              throw "Unknown error";
            }

            resolve();
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }

  const [isLoading, handleFpsTost] = useApiCallWithToast({
    apiCallFunction: () => validateAndSubmit(),
    handleSuccess: async () => {
      handleReset();
    },
    messages: {
      loading: "Editing FPS...", // Message while the API is running
      success: "FPS edited successfully!", // Message when successful
      error: "Failed to edite FPS.", // Message on error
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleFpsTost();
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFpsData(initialFpsValidation);
  };

  return {
    isAdminOrManager,
    currentStep,
    isDisabled,
    isDone,
    fpsData,
    setFpsData,
    fpsId,
    fpsCompleted,
    handleStatusChange,
    handleSubmit,
    handleReset,
    submitBtnValue,
    isLoading,
  };
};

export default useValidationSection;
