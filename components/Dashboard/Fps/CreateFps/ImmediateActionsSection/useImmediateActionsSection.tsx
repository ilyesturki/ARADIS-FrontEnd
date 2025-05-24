"use client";
import { FpsType, editedFpsImmediateActionsType } from "@/redux/fps/fpsSlice";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  customHandleChange,
  customHandleForTostSubmit,
  customHandleSubmit,
  handleChangeInArray,
  handleChangeInArrayObject,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { fpsImmediateActionsValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFpsImmediateActions } from "@/redux/fps/fpsThunk";
import {
  initialFpsImmediateActions,
  categoryData,
  serviceData,
} from "@/data/fps";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useApiCallWithToast } from "@/utils/Toast/useApiCallWithToast";

const useImmediateActionsSection = () => {
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  const [fpsData, setFpsData] = useState<editedFpsImmediateActionsType>(
    initialFpsImmediateActions
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
          !(tabsOrder.indexOf(currentStep) >= tabsOrder.indexOf("problem"))
      : isAdminOrManager;
  }, [isAdminOrManager, currentStep]);

  const fps = useAppSelector((state) => state.fpss.fps);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const fpsId = params.get("fpsId");

    if (fpsId) {
      setFpsId(fpsId);
      return;
    }
  }, []);

  useEffect(() => {
    console.log(fps);
    if (fps?.immediateActions && Object.keys(fps.immediateActions).length > 0) {
      console.log(fps?.immediateActions);
      const newSortingResult = [...(fps.immediateActions.sortingResults || [])];
      const newImmediateActions = [
        ...(fps.immediateActions.immediateActions || []),
      ];
      console.log("fps?.immediateActions");
      console.log(fps?.immediateActions);
      console.log("fps?.immediateActions");
      setFpsData({
        ...fps.immediateActions,
        sortingResults: newSortingResult,
        immediateActions: newImmediateActions,
      });
    }
    console.log(fps?.currentStep);
    setCurrentStep(fps?.currentStep || null);
    setSubmitBtnValue(
      ["immediateActions", "cause", "defensiveActions", "validation"].includes(
        fps?.currentStep || ""
      )
        ? "Update"
        : "Save"
    );
  }, [fps]);

  useEffect(() => {
    console.log("fpsData");
    console.log(fpsData);
    console.log("fpsData");
  }, [fpsData]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    customHandleChange(e, setFpsData);
  };

  const handleStartSorting = () => {
    setFpsData((prevData) => ({
      ...prevData,
      startSorting: !prevData.startSorting,
    }));
  };

  const editSortingResult = (index: number) => {
    const sortingResults = fpsData.sortingResults
      ?.map((e) => (e.edit ? { ...e, edit: false } : e))
      .map((e, i) => {
        return i === index ? { ...e, edit: true } : e;
      });
    setFpsData((prevData) => ({
      ...prevData,
      sortingResults,
    }));
  };

  const removeSortingResult = (index: number) => {
    if (fpsData.sortingResults) {
      const sortingResults = [
        ...fpsData.sortingResults.slice(0, index),
        ...fpsData.sortingResults.slice(index + 1),
      ];
      setFpsData((prevData) => ({
        ...prevData,
        sortingResults,
      }));
    }
  };

  const editImmediateAction = (index: number) => {
    const immediateActions = fpsData.immediateActions
      ?.map((e) => (e.edit ? { ...e, edit: false } : e))
      .map((e, i) => {
        return i === index ? { ...e, edit: true } : e;
      });
    setFpsData((prevData) => ({
      ...prevData,
      immediateActions,
    }));
  };

  const removeImmediateAction = (index: number) => {
    if (fpsData.immediateActions) {
      const immediateActions = [
        ...fpsData.immediateActions.slice(0, index),
        ...fpsData.immediateActions.slice(index + 1),
      ];
      setFpsData((prevData) => ({
        ...prevData,
        immediateActions,
      }));
    }
  };

  function validateAndSubmit(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const dataToValidate: Record<string, string> = {
        fpsId: fpsId,
        startSorting: fpsData.startSorting.toString() || "",
        sortingResults: JSON.stringify(fpsData.sortingResults || []),
        concludeFromSorting: fpsData.concludeFromSorting || "",
        immediateActions: JSON.stringify(fpsData.immediateActions || []),
      };
      const newErrors = validateFormFields(
        dataToValidate,
        fpsImmediateActionsValidationRules
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
          startSorting: fpsData.startSorting.toString() || "",
          sortingResults: JSON.stringify(fpsData.sortingResults || []),
          concludeFromSorting: fpsData.concludeFromSorting || "",
          immediateActions: JSON.stringify(fpsData.immediateActions || []),
        },
        async (formData) => {
          try {
            const result = await dispatch(
              createFpsImmediateActions({ id: fpsId, fps: formData })
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
    setFpsData(initialFpsImmediateActions);
  };

  return {
    fpsData,
    setFpsData,
    disabled,
    editSortingResult,
    removeSortingResult,
    editImmediateAction,
    removeImmediateAction,
    handleSubmit,
    handleReset,
    submitBtnValue,
    isAdminOrManager,
    currentStep,
    isDone,
    fpsId,

    handleChange,

    categoryData,
    serviceData,
    handleChangeInArray,
    handleChangeInArrayObject,
    handleStartSorting,
    isLoading,
  };
};

export default useImmediateActionsSection;
