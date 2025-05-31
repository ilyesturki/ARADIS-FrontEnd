"use client";
import {
  editedImmediatActionsType,
  editedFpsImmediateActionsType,
} from "@/redux/fps/fpsSlice";
import { useEffect, useState } from "react";
import { customHandleChange, handleChangeSelect } from "@/utils/handlers";

import {
  categoryData,
  serviceData,
  initialImmediateActionAction,
} from "@/data/fps";
import { validateFormFields } from "@/utils/validateFormFields";
import { handleError } from "@/utils/handleError";
import { ImmediatActionRules } from "@/utils/validationRules";

const useImmediateAction = (
  setFpsData: (prevState: editedFpsImmediateActionsType) => void,
  fpsData: editedFpsImmediateActionsType
) => {
  const [editedImmediateActionData, setEditedImmediateActionData] =
    useState<editedImmediatActionsType>(initialImmediateActionAction);

  useEffect(() => {
    const found = fpsData.immediateActions?.find((e) => e.edit);
    if (found) {
      setEditedImmediateActionData(found);
    }
  }, [fpsData.immediateActions]);

  const addNewAction = () => {
    const dataToValidate: Record<string, string> = {
      immediateActions: JSON.stringify(editedImmediateActionData),
    };
    const newErrors = validateFormFields(dataToValidate, ImmediatActionRules);
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }
    const newImmediateActionData = fpsData.immediateActions?.some((e) => e.edit)
      ? fpsData.immediateActions?.map((e) => {
          return e.edit
            ? { ...e, ...editedImmediateActionData, edit: false }
            : e;
        })
      : [
          ...(fpsData.immediateActions ? fpsData.immediateActions : []),
          editedImmediateActionData,
        ];

    setFpsData({
      ...fpsData,
      immediateActions: newImmediateActionData,
    });

    setEditedImmediateActionData({
      description: "",
      userCategory: "",
      userService: "",
    });
  };

  return {
    editedImmediateActionData,
    categoryData,
    serviceData,
    customHandleChange,
    handleChangeSelect,
    setEditedImmediateActionData,
    addNewAction,
  };
};

export default useImmediateAction;
