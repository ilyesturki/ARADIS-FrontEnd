"use client";
import { EditedTagActionType } from "@/redux/tag/tagSlice";
import { useEffect, useState } from "react";
import { customHandleChange, handleChangeSelect } from "@/utils/handlers";

import { categoryData, serviceData, initialTagAction } from "@/data/tag";
import { validateFormFields } from "@/utils/validateFormFields";
import { handleError } from "@/utils/handleError";
import { TagActionRules } from "@/utils/validationRules";

const useTagActions = (
  setTagData: (prevState: EditedTagActionType[]) => void,
  tagData: EditedTagActionType[]
) => {
  const [editedTagData, setEditedTagData] =
    useState<EditedTagActionType>(initialTagAction);

  useEffect(() => {
    const found = tagData.find((e) => e.edit);
    if (found) {
      setEditedTagData(found);
    }
  }, [tagData]);

  const addNewAction = () => {
    const dataToValidate: Record<string, string> = {
      tagAction: JSON.stringify(editedTagData),
    };
    const newErrors = validateFormFields(dataToValidate, TagActionRules);
    if (Object.keys(newErrors).length > 0) {
      handleError({ customError: true, errors: newErrors });
      return;
    }
    
    const newTagData = tagData.some((e) => e.edit)
      ? tagData.map((e) => {
          return e.edit ? { ...e, ...editedTagData, edit: false } : e;
        })
      : [...tagData, editedTagData];

    setTagData(newTagData);

    setEditedTagData({
      procedure: "",
      userCategory: "",
      userService: "",
      quand: "",
    });
  };

  return {
    editedTagData,
    categoryData,
    serviceData,
    customHandleChange,
    handleChangeSelect,
    setEditedTagData,
    addNewAction,
  };
};

export default useTagActions;
