"use client";
import {
  FpsType,
  flexibleFpsType,
  fpsDefensiveActionType,
  fpsImmediateActionsType,
} from "@/redux/fps/fpsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  customHandleChange,
  customImagesChange,
  customHandleSubmit,
  customHandleSizeChange,
  customHandleAlertChange,
  handleChangeInArray,
  handleChangeInArrayObject,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { fpsImmediateActionsValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFpsImmediateActions, getFps } from "@/redux/fps/fpsThunk";
import {
  initialFpsImmediateActions,
  categoryData,
  serviceData,
} from "@/data/fps";

import { useRouter, useSearchParams } from "next/navigation";

const useImmediateActionsSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();

  const [fpsData, setFpsData] = useState<fpsImmediateActionsType>(
    initialFpsImmediateActions
  );
  const [fpsId, setFpsId] = useState<FpsType["fpsId"]>("");

  const [submitBtnValue, setSubmitBtnValue] = useState<"Save" | "Update">(
    "Save"
  );

  const fps = useAppSelector((state) => state.fpss.fps);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let fpsId = params.get("fpsId");

    if (fpsId) {
      setFpsId(fpsId);
      return;
    }
  }, []);

  useEffect(() => {
    if (fps?.immediateActions && Object.keys(fps.immediateActions).length > 0) {
      const newAlert = [...(fps.immediateActions?.alert || [])];
      const newSortingResult = [...(fps.immediateActions.sortingResults || [])];
      const newImmediateActions = [
        ...(fps.immediateActions.immediateActions || []),
      ];
      console.log("fps?.immediateActions");
      console.log(fps?.immediateActions);
      console.log("fps?.immediateActions");
      setFpsData({
        ...fps.immediateActions,
        alert: newAlert,
        sortingResults: newSortingResult,
        immediateActions: newImmediateActions,
      });
      setSubmitBtnValue(
        ["cause", "defensiveActions", "validation"].includes(fps.currentStep)
          ? "Update"
          : "Save"
      );
    }
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

  const addNewSortingResult = () => {
    const sortingResults = [...(fpsData?.sortingResults || [])];
    sortingResults.push({
      product: "",
      sortedQuantity: "",
      quantityNOK: "",
      userCategory: "",
      userService: "",
    });
    setFpsData((prevData) => ({
      ...prevData,
      sortingResults,
    }));
  };
  const removeSortingResult = (index: number) => {
    if (fpsData.sortingResults && fpsData.sortingResults.length > 1) {
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

  const addNewImmediateAction = () => {
    const immediateActions = [...(fpsData?.immediateActions || [])];
    immediateActions.push({
      description: "",
      userCategory: "",
      userService: "",
    });

    setFpsData((prevData) => ({
      ...prevData,
      immediateActions,
    }));
  };

  const removeImmediateAction = (index: number) => {
    if (fpsData.immediateActions && fpsData.immediateActions.length > 1) {
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

  // const handleCategoryChange = (
  //   userCategory: fpsDefensiveActionType["userCategory"],
  //   i: number
  // ) => {
  //   handleChangeInArray(setFpsData, userCategory, "userCategory", i);
  // };

  // const handleServiceChange = (
  //   userService: fpsDefensiveActionType["userService"],
  //   i: number
  // ) => {
  //   handleChangeInArray(setFpsData, userService, "userService", i);
  // };

  const handleAlertChange = (data: string, i?: number) => {
    customHandleAlertChange(data, setFpsData, i);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      fpsId: fpsId,
      alert: JSON.stringify(fpsData.alert || []),
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
      return;
    }

    customHandleSubmit(
      e,
      {},
      {
        fpsId: fpsId,
        alert: JSON.stringify(fpsData.alert || []),
        startSorting: fpsData.startSorting.toString() || "",
        sortingResults: JSON.stringify(fpsData.sortingResults || []),
        concludeFromSorting: fpsData.concludeFromSorting || "",
        immediateActions: JSON.stringify(fpsData.immediateActions || []),
      },
      (formData) =>
        dispatch(createFpsImmediateActions({ id: fpsId, fps: formData }))
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFpsData(initialFpsImmediateActions);
  };

  return {
    fpsData,
    fpsId,
    handleChange,
    addNewSortingResult,
    removeSortingResult,
    addNewImmediateAction,
    removeImmediateAction,
    handleAlertChange,
    categoryData,
    serviceData,
    handleChangeInArray,
    handleChangeInArrayObject,
    setFpsData,
    handleStartSorting,

    handleSubmit,
    handleReset,
    submitBtnValue,
  };
};

export default useImmediateActionsSection;
