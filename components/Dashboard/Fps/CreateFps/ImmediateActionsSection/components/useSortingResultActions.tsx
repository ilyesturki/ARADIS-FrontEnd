"use client";
import {
  editedSortingResultsType,
  editedFpsImmediateActionsType,
} from "@/redux/fps/fpsSlice";
import { useEffect, useState } from "react";
import { customHandleChange, handleChangeSelect } from "@/utils/handlers";

import {
  categoryData,
  serviceData,
  initialSortingResultAction,
} from "@/data/fps";
import { validateFormFields } from "@/utils/validateFormFields";
import { handleError } from "@/utils/handleError";
import { SortingResultActionRules } from "@/utils/validationRules";

const useSortingResultActions = (
  setFpsData: (prevState: editedFpsImmediateActionsType) => void,
  fpsData: editedFpsImmediateActionsType
) => {
  const [editedSortingResultData, setEditedSortingResultData] =
    useState<editedSortingResultsType>(initialSortingResultAction);

  useEffect(() => {
    const found = fpsData.sortingResults?.find((e) => e.edit);
    if (found) {
      setEditedSortingResultData(found);
    }
  }, [fpsData.sortingResults]);

  const addNewAction = () => {
    const dataToValidate: Record<string, string> = {
      sortingResultAction: JSON.stringify(editedSortingResultData),
    };
    const newErrors = validateFormFields(
      dataToValidate,
      SortingResultActionRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }
    console.log("//////////////////////////////////////");
    console.log(fpsData.sortingResults);
    console.log(
      fpsData.sortingResults?.map((e, i) => {
        return e.edit ? { ...e, ...editedSortingResultData, edit: false } : e;
      })
    );
    const newSortingResultData = fpsData.sortingResults?.some((e) => e.edit)
      ? fpsData.sortingResults?.map((e, i) => {
          return e.edit ? { ...e, ...editedSortingResultData, edit: false } : e;
        })
      : [
          ...(fpsData.sortingResults ? fpsData.sortingResults : []),
          editedSortingResultData,
        ];

    console.log(editedSortingResultData);
    console.log(newSortingResultData);
    console.log("//////////////////////////////////////");
    setFpsData({
      ...fpsData,
      sortingResults: newSortingResultData,
    });

    // setSortingResultData(newSortingResultData);

    setEditedSortingResultData({
      product: "",
      sortedQuantity: "",
      quantityNOK: "",
      userCategory: "",
      userService: "",
    });
  };

  return {
    editedSortingResultData,
    categoryData,
    serviceData,
    customHandleChange,
    handleChangeSelect,
    setEditedSortingResultData,
    addNewAction,
  };
};

export default useSortingResultActions;
