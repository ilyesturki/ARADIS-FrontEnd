"use client";
import { EditedDefensiveActionType } from "@/redux/fps/fpsSliceSlice";
import { useEffect, useState } from "react";
import { customHandleChange, handleChangeSelect } from "@/utils/handlers";

import { categoryData, serviceData, initialDefensiveAction } from "@/data/fps";
import { validateFormFields } from "@/utils/validateFormFields";
import { handleError } from "@/utils/handleError";
import { FpsDefensiveActionRules } from "@/utils/validationRules";

const useDefensiveActions = (
  setDefensiveData: (prevState: EditedDefensiveActionType[]) => void,
  defensiveData: EditedDefensiveActionType[]
) => {
  const [editedDefensiveData, setEditedDefensiveData] =
    useState<EditedDefensiveActionType>(initialDefensiveAction);

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
    const newErrors = validateFormFields(dataToValidate, DefensiveActionRules);
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }
    console.log("//////////////////////////////////////");
    console.log(defensiveData);
    console.log(
      defensiveData.map((e, i) => {
        return e.edit ? { ...e, ...editedDefensiveData, edit: false } : e;
      })
    );
    const newDefensiveData = defensiveData.some((e) => e.edit)
      ? defensiveData.map((e, i) => {
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
