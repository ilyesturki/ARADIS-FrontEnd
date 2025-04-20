"use client";
import { editedDefensiveActionType } from "@/redux/fps/fpsSlice";
import { useEffect, useState } from "react";
import { customHandleChange, handleChangeSelect } from "@/utils/handlers";

import {
  categoryData,
  serviceData,
  initialFpsDefensiveAction,
} from "@/data/fps";
import { validateFormFields } from "@/utils/validateFormFields";
import { handleError } from "@/utils/handleError";
import { FpsDefensiveActionRules } from "@/utils/validationRules";

const useDefensiveActions = (
  setDefensiveData: (prevState: editedDefensiveActionType[]) => void,
  defensiveData: editedDefensiveActionType[]
) => {
  const [editedDefensiveData, setEditedDefensiveData] =
    useState<editedDefensiveActionType>(initialFpsDefensiveAction);

  useEffect(() => {
    const found = defensiveData.find((e) => e.edit);
    if (found) {
      setEditedDefensiveData(found);
    }
  }, [defensiveData]);

  const addNewAction = () => {
    const dataToValidate: Record<string, string> = {
      defensiveAction: JSON.stringify(editedDefensiveData),
    };
    const newErrors = validateFormFields(
      dataToValidate,
      FpsDefensiveActionRules
    );
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }
    console.log("//////////////////////////////////////");
    console.log(defensiveData);
    console.log(
      defensiveData.map((e) => {
        return e.edit ? { ...e, ...editedDefensiveData, edit: false } : e;
      })
    );
    const newDefensiveData = defensiveData.some((e) => e.edit)
      ? defensiveData.map((e) => {
          return e.edit ? { ...e, ...editedDefensiveData, edit: false } : e;
        })
      : [...defensiveData, editedDefensiveData];

    console.log(editedDefensiveData);
    console.log(newDefensiveData);
    console.log("//////////////////////////////////////");
    setDefensiveData(newDefensiveData);

    setEditedDefensiveData({
      procedure: "",
      userCategory: "",
      userService: "",
      quand: "",
    });
  };

  return {
    editedDefensiveData,
    categoryData,
    serviceData,
    customHandleChange,
    handleChangeSelect,
    setEditedDefensiveData,
    addNewAction,
  };
};

export default useDefensiveActions;
