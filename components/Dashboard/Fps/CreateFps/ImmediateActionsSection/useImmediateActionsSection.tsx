"use client";
import {
  FpsType,
  flexibleFpsType,
  fpsDefensiveActionType,
  fpsImmediateActionsType,
} from "@/redux/fps/fpsSlice";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
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
  const [fpsId, setFpsQid] = useState<FpsType["fpsId"]>("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let fpsId = params.get("fpsId");

    if (fpsId) {
      setFpsQid(fpsId);
      return;
    }
  }, []);

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
    const immediatActions = [...(fpsData?.immediatActions || [])];
    immediatActions.push({
      description: "",
      userCategory: "",
      userService: "",
    });

    setFpsData((prevData) => ({
      ...prevData,
      immediatActions,
    }));
  };

  const removeImmediateAction = (index: number) => {
    if (fpsData.immediatActions && fpsData.immediatActions.length > 1) {
      const immediatActions = [
        ...fpsData.immediatActions.slice(0, index),
        ...fpsData.immediatActions.slice(index + 1),
      ];
      setFpsData((prevData) => ({
        ...prevData,
        immediatActions,
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
      qid: fpsId,
      alert: JSON.stringify(fpsData.alert || []),
      startSorting: fpsData.startSorting.toString() || "",
      sortingResults: JSON.stringify(fpsData.sortingResults || []),
      concludeFromSorting: fpsData.concludeFromSorting || "",
      immediatActions: JSON.stringify(fpsData.immediatActions || []),
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
        qid: fpsId,
        alert: JSON.stringify(fpsData.alert || []),
        startSorting: fpsData.startSorting.toString() || "",
        sortingResults: JSON.stringify(fpsData.sortingResults || []),
        concludeFromSorting: fpsData.concludeFromSorting || "",
        immediatActions: JSON.stringify(fpsData.immediatActions || []),
      },
      (formData) =>
        dispatch(createFpsImmediateActions({ id: fpsId, fps: formData })),
      handleReset
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFpsData(initialFpsImmediateActions);
    dispatch(getFps(fpsId));
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
  };
};

export default useImmediateActionsSection;
