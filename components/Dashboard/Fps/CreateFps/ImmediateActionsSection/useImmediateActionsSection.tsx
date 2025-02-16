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
  handleChangeSelectInArray,
} from "@/utils/handlers";
import { validateFormFields } from "@/utils/validateFormFields";
import { verifyFpsValidationRules } from "@/utils/validationRules";
import { handleError } from "@/utils/handleError";
import { createFps } from "@/redux/fps/fpsThunk";
import { generateQRAPId } from "@/utils/generateQRAPId";
import { categoryData, serviceData } from "@/data/fps";

const initialFpsState: fpsImmediateActionsType = {
  alert: [],
  startSorting: false,
  sortingResults: [
    {
      product: "",
      sortedQuantity: "",
      quantityNOK: "",
      userCategory: "",
      userService: "",
    },
  ],
  concludeFromSorting: "",
  immediatActions: [
    {
      description: "",
      userCategory: "",
      userService: "",
    },
  ],
};
const useImmediateActionsSection = () => {
  const dispatch = useAppDispatch();

  const [fpsData, setFpsData] =
    useState<fpsImmediateActionsType>(initialFpsState);
  const [fpsQid, setFpsQid] = useState<FpsType["qid"]>("");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    customHandleChange(e, setFpsData);
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

  const handleCategoryChange = (
    userCategory: fpsDefensiveActionType["userCategory"],
    i: number
  ) => {
    handleChangeSelectInArray(setFpsData, userCategory, "userCategory", i);
  };

  const handleServiceChange = (
    userService: fpsDefensiveActionType["userService"],
    i: number
  ) => {
    handleChangeSelectInArray(setFpsData, userService, "userService", i);
  };

  const handleAlertChange = (data: string, i?: number) => {
    customHandleAlertChange(data, setFpsData, i);
  };

  useEffect(() => {
    const qid = generateQRAPId("QRAP", 8);
    setFpsQid(qid);
  }, []);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const dataToValidate: Record<string, string> = {
      qid: fpsQid,
    };
    const newErrors = validateFormFields(
      dataToValidate,
      verifyFpsValidationRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }

    customHandleSubmit(
      e,
      {},
      {
        qid: fpsQid,
      },
      (formData) => dispatch(createFps(formData)),
      handleReset
    );
  };
  const handleReset = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    setFpsData(initialFpsState);
  };

  return {
    fpsData,
    fpsQid,
    handleChange,
    addNewSortingResult,
    removeSortingResult,
    addNewImmediateAction,
    removeImmediateAction,
    handleAlertChange,
    categoryData,
    serviceData,
    handleCategoryChange,
    handleServiceChange,

    handleSubmit,
    handleReset,
  };
};

export default useImmediateActionsSection;
