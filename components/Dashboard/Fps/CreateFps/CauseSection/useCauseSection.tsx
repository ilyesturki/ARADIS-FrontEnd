"use client";
import { FpsType, fpsCauseType } from "@/redux/fps/fpsSlice";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  customHandleSubmit,
  customHandleCauseChange,
  customHandleForTostSubmit,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { fpsCauseValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFpsCause } from "@/redux/fps/fpsThunk";

import { initialFpsCause, causeData } from "@/data/fps";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useApiCallWithToast } from "@/utils/Toast/useApiCallWithToast";

const useCauseSection = () => {
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const [fpsData, setFpsData] = useState<fpsCauseType>(initialFpsCause);
  const [fpsId, setFpsId] = useState<FpsType["fpsId"]>("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const fpsId = params.get("fpsId");

    if (fpsId) {
      setFpsId(fpsId);
      return;
    }
  }, []);

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
            tabsOrder.indexOf("immediateActions")
          )
      : isAdminOrManager;
  }, [isAdminOrManager, currentStep]);

  const fps = useAppSelector((state) => state.fpss.fps);

  useEffect(() => {
    if (fps?.cause && Object.keys(fps?.cause).length > 0) {
      const causeList = [...(fps?.cause.causeList || [])];
      const whyList = [...(fps?.cause.whyList || [])];
      setFpsData({
        causeList,
        whyList,
      });
    }
    setCurrentStep(fps?.currentStep || null);
    setSubmitBtnValue(
      ["cause", "defensiveActions", "validation"].includes(
        fps?.currentStep || ""
      )
        ? "Update"
        : "Save"
    );
  }, [fps]);

  const addNewWhy = () => {
    setFpsData((prevData) => ({
      ...prevData,
      whyList: [...prevData.whyList, ""],
    }));
  };

  const removeWhy = (index: number) => {
    if (fpsData.whyList.length > 1) {
      setFpsData((prevData) => ({
        ...prevData,
        whyList: prevData.whyList.filter((_, i) => i !== index),
      }));
    }
  };

  const handleCauseChange = (data: string, i?: number) => {
    customHandleCauseChange(data, setFpsData, i);
  };

  const handleChangeWhyList = (data: string, i?: number) => {
    setFpsData((prevData) => ({
      ...prevData,
      whyList: prevData.whyList.map((item, index) =>
        index === i ? data : item
      ),
    }));
  };

  function validateAndSubmit(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const dataToValidate: Record<string, string> = {
        fpsId: fpsId,
        causeList: JSON.stringify(fpsData.causeList),
        whyList: JSON.stringify(fpsData.whyList),
      };
      const newErrors = validateFormFields(
        dataToValidate,
        fpsCauseValidationRules
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
          causeList: JSON.stringify(fpsData.causeList),
          whyList: JSON.stringify(fpsData.whyList),
        },
        async (formData) => {
          try {
            const result = await dispatch(
              createFpsCause({ id: fpsId, fps: formData })
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
    setFpsData(initialFpsCause);
  };

  return {
    isAdminOrManager,
    currentStep,
    isDisabled,
    isDone,
    fpsData,
    fpsId,
    addNewWhy,
    removeWhy,
    causeData,
    handleCauseChange,
    handleChangeWhyList,
    handleSubmit,
    handleReset,
    submitBtnValue,
    isLoading,
  };
};

export default useCauseSection;
