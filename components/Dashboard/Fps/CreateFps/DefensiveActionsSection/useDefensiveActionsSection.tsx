"use client";
import { FpsType, editedDefensiveActionType } from "@/redux/fps/fpsSlice";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  customHandleForTostSubmit,
  customHandleSubmit,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { FpsDefensiveActionsRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFpsDefensiveActions } from "@/redux/fps/fpsThunk";

import { initialFpsDefensiveActions } from "@/data/fps";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useApiCallWithToast } from "@/utils/Toast/useApiCallWithToast";

const useDefensiveActionsSection = () => {
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const [fpsData, setFpsData] = useState<editedDefensiveActionType[]>(
    initialFpsDefensiveActions
  );
  const [fpsId, setFpsId] = useState<FpsType["fpsId"]>("");

  const [submitBtnValue, setSubmitBtnValue] = useState<"Save" | "Update">(
    "Save"
  );

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

  const disabled = useMemo(() => {
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
          !(tabsOrder.indexOf(currentStep) >= tabsOrder.indexOf("cause"))
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

  const fps = useAppSelector((state) => state.fpss.fps);

  useEffect(() => {
    if (
      fps?.defensiveActions &&
      Object.keys(fps?.defensiveActions).length > 0
    ) {
      setFpsData(fps?.defensiveActions);
    }
    setCurrentStep(fps?.currentStep || null);
    setSubmitBtnValue(
      ["defensiveActions", "validation"].includes(fps?.currentStep || "")
        ? "Update"
        : "Save"
    );
  }, [fps]);

  const editDefensiveAction = (index: number) => {
    const newFpsData = fpsData
      .map((e) => (e.edit ? { ...e, edit: false } : e))
      .map((e, i) => {
        return i === index ? { ...e, edit: true } : e;
      });

    setFpsData(newFpsData);
  };

  const removeDefensiveAction = (index: number) => {
    if (fpsData.length > 1) {
      setFpsData((prevData) => prevData.filter((_, i) => i !== index));
    }
  };

  function validateAndSubmit(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const dataToValidate: Record<string, string> = {
        fpsId: fpsId,
        defensiveActions: JSON.stringify(fpsData),
      };
      const newErrors = validateFormFields(
        dataToValidate,
        FpsDefensiveActionsRules
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
          defensiveActions: JSON.stringify(fpsData),
        },
        async (formData) => {
          try {
            const result = await dispatch(
              createFpsDefensiveActions({ id: fpsId, fps: formData })
            );

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
      loading: "Editing FPS...", 
      success: "FPS edited successfully!", 
      error: "Failed to edite FPS.", 
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
    setFpsData(initialFpsDefensiveActions);
  };

  return {
    disabled,
    setFpsData,
    fpsData,
    editDefensiveAction,
    removeDefensiveAction,
    handleSubmit,
    handleReset,
    submitBtnValue,
    isAdminOrManager,
    isDone,
    fpsId,
    isLoading,
  };
};

export default useDefensiveActionsSection;
